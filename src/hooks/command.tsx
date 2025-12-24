import type { FileSystem } from '../types';

export function useTerminalCommands(
  addToHistory: (cmd: string, output: string | string[], isError?: boolean) => void
) {

  const buildTree = (fs: FileSystem, prefix: string = ''): string[] => {
    const entries = Object.entries(fs);
    const lines: string[] = [];
    entries.forEach(([name, item], index) => {
      const isLast = index === entries.length - 1;
      const icon = item.type === 'directory' ? '📁' : '📄';
      lines.push(`${prefix}${isLast ? '└── ' : '├── '}${icon} ${name}`);
      if (item.type === 'directory' && item.children) {
        const childPrefix = prefix + (isLast ? '    ' : '│   ');
        lines.push(...buildTree(item.children, childPrefix));
      }
    });
    return lines;
  };

  const processCommand = (cmd: string): boolean => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();

    if (command === 'clear') {
      return true;
    }

    if (command === 'help' || command === '?') {
      addToHistory(cmd, [
        '╔══════════════════════════════════════════════════╗',
        '║                  COMANDOS                        ║',
        '╠══════════════════════════════════════════════════╣',
        '║  ai                  - Acessar menu de IAs       ║',
        '║  exit                - Sair do chat atual        ║',
        '║  clear               - Limpar terminal           ║',
        '║  history             - Ver histórico             ║',
        '╚══════════════════════════════════════════════════╝'
      ]);
      return false;
    }

    if (command === 'ai' || command === 'exit') {
      return true; 
    }

    if (command === 'history') {
      return true; 
    }

    addToHistory(cmd, `bash: ${command}: comando não encontrado. Digite 'help' para ajuda.`, true);
    return false;
  };

  return { processCommand };
}