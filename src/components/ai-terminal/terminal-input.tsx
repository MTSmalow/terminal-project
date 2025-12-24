import type { RefObject } from 'react';
import type { Theme } from '../../types';

interface TerminalInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  input: string;
  setInput: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled: boolean;
  getPrompt: () => string;
  theme: Theme;
}

export default function TerminalInput({
  inputRef,
  input,
  setInput,
  onKeyDown,
  disabled,
  getPrompt,
  theme
}: TerminalInputProps) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <span style={{ color: theme.ok }}>➜</span>
      <span className="text-blue-400">{getPrompt()}</span>
      <span className="text-gray-500">~</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        className="flex-1 bg-transparent outline-none border-none"
        style={{ color: theme.text, caretColor: theme.ok }}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
}