import type { Theme } from '../../types';

interface TerminalBannerProps {
  theme: Theme;
}

export default function TerminalBanner({ theme }: TerminalBannerProps) {
  return (
    <div className="mb-6">
      <div
        className="border-2 rounded p-4 text-green-400 whitespace-pre"
        style={{
          borderColor: theme.border,
          backgroundColor: `${theme.bg}cc`,
        }}
      >
{`
    ___    ____   ______                     _             __
   /   |  /  _/  /_  __/___  _________ ___  (_)___  ____ _/ /
  / /| |  / /     / / / __ \\/ ___/ __ \`__ \\/ / __ \\/ __ \`/ / 
 / ___ |_/ /     / / / /_/ / /  / / / / / / / / / / /_/ / /  
/_/  |_/___/    /_/  \\____/_/  /_/ /_/ /_/_/_/ /_/\\__,_/_/   

═══════════════════════════════════════════════════════════════
  Digite 'help' para ver comandos | 'ai' para usar IA
  Use ↑/↓ para navegar histórico | Tab para autocompletar
═══════════════════════════════════════════════════════════════`}
      </div>
    </div>
  );
}