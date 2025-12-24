import type { HistoryEntry, Theme } from '../../types';

interface CommandHistoryProps {
  history: HistoryEntry[];
  getPrompt: () => string;
  theme: Theme;
}

export default function CommandHistory({ history, getPrompt, theme }: CommandHistoryProps) {
  return (
    <>
      {history.map((entry) => (
        <div key={entry.id} className="mb-3">
          {entry.command && (
            <div className="flex items-center gap-2 mb-1">
              <span style={{ color: theme.ok }}>➜</span>
              <span className="text-blue-400">{getPrompt()}</span>
              <span className="text-gray-500">~</span>
              <span style={{ color: theme.text }}>{entry.command}</span>
            </div>
          )}
          {entry.output && (
            <div 
              className="ml-4 whitespace-pre-wrap"
              style={{ color: entry.isError ? theme.error : theme.text }}
            >
              {Array.isArray(entry.output) ? entry.output.join('\n') : entry.output}
            </div>
          )}
        </div>
      ))}
    </>
  );
}