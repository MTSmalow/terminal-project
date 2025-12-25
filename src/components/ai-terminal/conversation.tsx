import type { AIModel, ConversationMessage, Theme } from '../../types';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface AIConversationProps {
  selectedAI: AIModel;
  conversation: ConversationMessage[];
  theme: Theme;
}

export default function AIConversation({ selectedAI, conversation, theme }: AIConversationProps) {
  return (
    <>
      {conversation.map((msg, idx) => {
        const IconComponent = selectedAI.icon;
        return (
          <div key={idx} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              {msg.role === 'user' ? (
                <>
                  <span style={{ color: theme.accent }}>💬</span>
                  <span className="text-blue-400 font-semibold">Você:</span>
                </>
              ) : msg.role === 'assistant' ? (
                <>
                  <IconComponent size={16} style={{ color: theme.ok }} />
                  <span style={{ color: theme.ok }} className="font-semibold">
                    {selectedAI.name}:
                  </span>
                </>
              ) : (
                <>
                  <span style={{ color: theme.error }}>⚠</span>
                  <span style={{ color: theme.error }} className="font-semibold">Erro:</span>
                </>
              )}
            </div>
            <div 
              className="ml-6 bg-black bg-opacity-30 p-3 rounded prose prose-invert max-w-none"
              style={{ color: msg.role === 'error' ? theme.error : theme.text }}
            >
              {msg.role === 'assistant' ? (
                <ReactMarkdown
                  components={{
                    code({ node, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !className?.includes('language-') && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      );
                    },
                    p: ({ children }) => <p className="mb-2">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold mb-2">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-500 pl-4 italic my-2">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                <div className="whitespace-pre-wrap">{msg.content}</div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}