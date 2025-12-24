export interface AIModel {
  id: string;
  name: string;
  icon: any;
  description: string;
}

export interface HistoryEntry {
  id: number;
  command: string;
  output: string | string[];
  isError?: boolean;
  timestamp: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'error';
  content: string;
}

export interface FileSystem {
  [key: string]: {
    type: 'file' | 'directory';
    content?: string;
    children?: FileSystem;
  };
}

export interface Theme {
  bg: string;
  bar: string;
  border: string;
  text: string;
  ok: string;
  error: string;
  accent: string;
}