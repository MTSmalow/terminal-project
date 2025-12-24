import { X } from 'lucide-react';
import type { AIModel, Theme } from '../../types';

interface AIMenuModalProps {
  aiModels: AIModel[];
  onSelectAI: (ai: AIModel) => void;
  onClose: () => void;
  theme: Theme;
}

export default function AIMenuModal({ aiModels, onSelectAI, onClose, theme }: AIMenuModalProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm z-50">
      <div
        className="border-2 rounded-lg p-6 max-w-2xl w-full mx-4"
        style={{
          backgroundColor: theme.bg,
          borderColor: theme.border
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: theme.ok }}>
            🤖 Selecione uma IA
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
            style={{ color: theme.text }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiModels.map((ai) => {
            const IconComponent = ai.icon;
            return (
              <button
                key={ai.id}
                onClick={() => onSelectAI(ai)}
                className="border-2 rounded-lg p-4 text-left hover:bg-white/5 transition-all"
                style={{ borderColor: theme.border }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent size={24} style={{ color: theme.accent }} />
                  <h3 className="font-bold" style={{ color: theme.text }}>
                    {ai.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-400">{ai.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}