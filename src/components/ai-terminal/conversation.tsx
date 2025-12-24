import type { AIModel, ConversationMessage, Theme } from '../../types';

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
              className="ml-6 whitespace-pre-wrap bg-black bg-opacity-30 p-3 rounded"
              style={{ color: msg.role === 'error' ? theme.error : theme.text }}
            >
              {msg.content}
            </div>
          </div>
        );
      })}
    </>
  );
}