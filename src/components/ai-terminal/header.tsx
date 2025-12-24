import { Monitor } from 'lucide-react';
import type { AIModel, Theme } from '../../types';

interface TerminalHeaderProps {
  selectedAI: AIModel | null;
  currentPath: string;
  theme: Theme;
}

export default function TerminalHeader({ selectedAI, currentPath, theme }: TerminalHeaderProps) {
  return (
    <div
      className="px-4 py-2 flex items-center justify-between border-b"
      style={{
        backgroundColor: theme.bar,
        borderColor: theme.border,
      }}
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="text-gray-400 text-xs font-mono flex items-center gap-2">
        <Monitor size={14} />
        {selectedAI ? `IA: ${selectedAI.name}` : currentPath}
      </div>
      <div className="w-16"></div>
    </div>
  );
}