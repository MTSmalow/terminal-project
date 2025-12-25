import { MessageSquare, Code, Sparkles, Database } from 'lucide-react';
import type { AIModel , Theme } from './types';

export const AI_MODELS: AIModel[] = [
  { 
    id: 'geral', 
    name: 'Geral', 
    icon: MessageSquare, 
    description: 'Velocidade e Fluidez',
    model: 'gemini-2.5-flash',
    temperature: 0.7
  },
  { 
    id: 'code', 
    name: 'Code', 
    icon: Code, 
    description: 'Lógica e Precisão',
    model: 'gemini-3-flash-preview',
    temperature: 0.2
  },
  { 
    id: 'creative', 
    name: 'Creative', 
    icon: Sparkles, 
    description: 'Nuance e Originalidade',
    model: 'gemini-3-flash-preview',
    temperature: 0.9
  },
  { 
    id: 'data', 
    name: 'Data', 
    icon: Database, 
    description: 'Contexto e Fatos',
    model: 'gemini-3-flash-preview',
    temperature: 0.0
  }
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
