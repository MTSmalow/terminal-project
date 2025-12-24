import { MessageSquare, Code, Sparkles, Cpu } from 'lucide-react';
import type { AIModel, FileSystem, Theme } from './types';

export const AI_MODELS: AIModel[] = [
  { id: 'chat', name: 'Chat GPT', icon: MessageSquare, description: 'Conversação geral e assistência' },
  { id: 'code', name: 'Code Assistant', icon: Code, description: 'Ajuda com programação' },
  { id: 'creative', name: 'Creative AI', icon: Sparkles, description: 'Conteúdo criativo' },
  { id: 'analysis', name: 'Data Analysis', icon: Cpu, description: 'Análise de dados' }
];

export const THEME: Theme = {
  bg: '#0a0a0a',
  bar: '#0f0a0a',
  border: '#2a1a1a',
  text: '#d0d0d0',
  ok: '#22c55e',
  error: '#ef4444',
  accent: '#3b82f6'
};

export const INITIAL_FS: FileSystem = {
  'home': {
    type: 'directory',
    children: {
      'documentos': {
        type: 'directory',
        children: {
          'readme.txt': { type: 'file', content: 'Bem-vindo ao Terminal AI!\nEste é um terminal funcional com IA integrada.' },
          'projetos.txt': { type: 'file', content: 'Meus Projetos:\n- Terminal AI\n- Portfolio\n- Estudos' }
        }
      },
      'scripts': {
        type: 'directory',
        children: {
          'hello.sh': { type: 'file', content: '#!/bin/bash\necho "Hello World!"' }
        }
      }
    }
  }
};