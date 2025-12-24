import { useState, useRef, useEffect } from 'react';
import TerminalHeader from '../components/ai-terminal/header';
import TerminalBanner from '../components/ai-terminal/banner';
import CommandHistory from '../components/ai-terminal/history';
import AIConversation from '../components/ai-terminal/conversation';
import LoadingIndicator from '../components/ai-terminal/loading-indicator';
import TerminalInput from '../components/ai-terminal/terminal-input';
import AIMenuModal from '../components/ai-terminal/menu';
import { useTerminalCommands } from '../hooks/command';
import { AI_MODELS, THEME } from '../constants';
import type { AIModel, HistoryEntry, ConversationMessage } from '../types';

export default function AITerminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showAIMenu, setShowAIMenu] = useState<boolean>(false);
  const [selectedAI, setSelectedAI] = useState<AIModel | null>(null);
  const [aiConversation, setAiConversation] = useState<ConversationMessage[]>([]);
  const [currentPath] = useState<string>('/home');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyIdRef = useRef<number>(0);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, aiConversation]);

  useEffect(() => {
    if (inputRef.current && !showAIMenu && !selectedAI) {
      inputRef.current.focus();
    }
  }, [showAIMenu, selectedAI]);

  const addToHistory = (command: string, output: string | string[], isError: boolean = false) => {
    setHistory(prev => [...prev, {
      id: historyIdRef.current++,
      command,
      output,
      isError,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const { processCommand } = useTerminalCommands(
    addToHistory
  );

  const handleAIQuery = async (query: string) => {
    if (!query.trim()) return;

    setAiConversation(prev => [...prev, { role: 'user', content: query }]);
    setIsProcessing(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              ...aiConversation.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
              })),
              {
                role: 'user',
                parts: [{ text: query }]
              }
            ]
          })
        }
      );

      const data = await response.json();

      const aiResponse =
        data?.candidates?.[0]?.content?.parts
          ?.map((part: any) => part.text)
          .join('\n') || 'Sem resposta da IA';

      setAiConversation(prev => [
        ...prev,
        { role: 'assistant', content: aiResponse }
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido';

      setAiConversation(prev => [
        ...prev,
        {
          role: 'error',
          content: `Erro ao conectar com a IA: ${errorMessage}`
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };


  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    
    if (trimmed) {
      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    if (trimmed === 'clear') {
      setHistory([]);
      setAiConversation([]);
      setSelectedAI(null);
      return;
    }

    if (trimmed === 'ai') {
      setShowAIMenu(true);
      addToHistory(cmd, ' Abrindo menu de IAs...');
      return;
    }

    if (trimmed === 'exit') {
      if (selectedAI) {
        setSelectedAI(null);
        setAiConversation([]);
        addToHistory(cmd, 'Chat com IA encerrado.');
      } else {
        addToHistory(cmd, 'Nenhum chat ativo para encerrar.', true);
      }
      return;
    }

    if (trimmed === 'history') {
      const histLines = commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`);
      addToHistory(cmd, histLines.length > 0 ? histLines : ['(vazio)']);
      return;
    }

    processCommand(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!input.trim() || isProcessing) return;

      if (selectedAI) {
        handleAIQuery(input);
      } else {
        handleCommand(input);
      }

      setInput('');
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const newIndex = historyIndex === -1 
        ? commandHistory.length - 1 
        : Math.max(0, historyIndex - 1);
      
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['ai', 'clear', 'help', 'history', 'exit'];
      const matches = commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
      return;
    }

    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setInput('');
      addToHistory(input, '^C');
      return;
    }

    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
      return;
    }
  };

  const selectAI = (ai: AIModel) => {
    setSelectedAI(ai);
    setShowAIMenu(false);
    setAiConversation([]);
    addToHistory('', `✓ IA "${ai.name}" selecionada. Digite suas perguntas ou "exit" para sair.`);
  };

  const getPrompt = () => {
    if (selectedAI) {
      return `${selectedAI.name.toLowerCase().replace(/\s/g, '-')}@ai`;
    }
    return 'user@terminal';
  };

  return (
    <div
      className="h-screen w-full flex flex-col p-3"
      style={{ backgroundColor: THEME.bg }}
    >
      <div
        className="h-full w-full border-2 rounded-lg overflow-hidden flex flex-col"
        style={{ borderColor: THEME.border }}
      >
        <TerminalHeader 
          selectedAI={selectedAI} 
          currentPath={currentPath} 
          theme={THEME} 
        />

        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm"
          style={{ color: THEME.text }}
        >
          {history.length === 0 && !selectedAI && (
            <TerminalBanner theme={THEME} />
          )}

          <CommandHistory 
            history={history} 
            getPrompt={getPrompt} 
            theme={THEME} 
          />

          {selectedAI && (
            <AIConversation 
              selectedAI={selectedAI} 
              conversation={aiConversation} 
              theme={THEME} 
            />
          )}

          {isProcessing && <LoadingIndicator />}

          <TerminalInput
            inputRef={inputRef}
            input={input}
            setInput={setInput}
            onKeyDown={handleKeyDown}
            disabled={isProcessing || showAIMenu}
            getPrompt={getPrompt}
            theme={THEME}
          />
        </div>

        {showAIMenu && (
          <AIMenuModal
            aiModels={AI_MODELS}
            onSelectAI={selectAI}
            onClose={() => setShowAIMenu(false)}
            theme={THEME}
          />
        )}
      </div>
    </div>
  );
}