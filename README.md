# AI Terminal

Um terminal interativo moderno desenvolvido em React e TypeScript com integração de APIs de Inteligência Artificial. Este projeto foi criado para praticar e demonstrar a integração de IAs em aplicações TypeScript, simulando um ambiente de linha de comando.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Sobre o Projeto

O AI Terminal é um projeto educacional que combina conceitos de desenvolvimento frontend moderno com integração de APIs de IA. Ele simula um terminal Unix-like funcional com histórico de comandos e múltiplas personalidades de IA para diferentes tipos de assistência.

### Objetivos de Aprendizado

- **Integração de APIs de IA**: Prática de consumo de APIs externas
- **TypeScript Avançado**: Uso de tipos complexos, interfaces e generics
- **Gerenciamento de Estado**: useState, useRef e hooks customizados
- **Componentização**: Arquitetura modular e reutilizável
- **UX/UI**: Criação de interfaces interativas e responsivas

## Funcionalidades

###  Comandos do Sistema

- **`history`** - Histórico de comandos
- **`clear`** - Limpa o terminal
- **`help`** - Lista todos os comandos

###  Integração com IA

- **`ai`** - Abre menu de seleção de IAs
- Múltiplos modelos especializados:
  - **Gemini** - Conversação geral e assistência
  - **Code Assistant** - Ajuda com programação
  - **Creative AI** - Conteúdo criativo
  - **Data Analysis** - Análise de dados
- **`exit`** - Sai do chat com IA

### Atalhos de Teclado

- **↑/↓** - Navega pelo histórico de comandos
- **Tab** - Autocompletar comandos
- **Ctrl+C** - Cancela comando atual
- **Ctrl+L** - Limpa o terminal
- **Enter** - Executa comando ou envia mensagem para IA

## Como Executar

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/MTSmalow/terminal-project.git

# Entre no diretório
cd terminal-project

# Instale as dependências
npm install
# ou
yarn install

# Execute o projeto
npm run dev
# ou
yarn dev
```

### Configuração da API

Para utilizar a integração com IA, você precisa configurar a API:

1. Obtenha uma chave de API
2. A API está configurada para funcionar sem necessidade de chave no ambiente de desenvolvimento
3. Para produção, configure a variável de ambiente `VITE_GEMINI_API_KEY`

## Estrutura do Projeto

```
src/
├── types.ts                          # Interfaces e tipos TypeScript
├── constants.ts                      # Constantes e configurações
├── hooks/
│   └── useTerminalCommands.ts       # Lógica de comandos do terminal
├── components/
│   ├── TerminalHeader.tsx           # Cabeçalho do terminal
│   ├── TerminalBanner.tsx           # Banner de boas-vindas
│   ├── CommandHistory.tsx           # Histórico de comandos
│   ├── AIConversation.tsx           # Interface de chat com IA
│   ├── LoadingIndicator.tsx         # Indicador de carregamento
│   ├── TerminalInput.tsx            # Campo de entrada
│   └── AIMenuModal.tsx              # Modal de seleção de IA
└── AITerminal.tsx                    # Componente principal
```

## Tecnologias Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Vite** - Build tool e dev server

## Arquitetura

### Gerenciamento de Estado

Utiliza hooks do React para gerenciar:
- Histórico de comandos e saída
- Estado da conversa com IA
- Controle de UI (modals, loading)

### Hook Customizado

`useTerminalCommands` encapsula toda a lógica de processamento de comandos, mantendo o componente principal limpo e focado na UI.

## Conceitos Praticados

1. **Integração de APIs REST** - Chamadas assíncronas e tratamento de erros
2. **TypeScript Avançado** - Interfaces complexas e type safety
3. **React Hooks** - useState, useEffect, useRef e hooks customizados
4. **Componentização** - Separação de responsabilidades
5. **UX Patterns** - Autocomplete, histórico, atalhos de teclado
6. **Tratamento de Eventos** - Keyboard events e input handling
