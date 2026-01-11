# Synth Video Monorepo

A modern monorepo for video synthesis platform built with pnpm workspaces.

## 📁 Structure

```
synth-video-monorepo/
├─ apps/
│  ├─ web/                # React Web Application
│  ├─ desktop-ui/         # React Renderer (Electron)
│  └─ desktop/            # Electron main + preload
│
├─ packages/
│  ├─ ui/                 # Design System React
│  ├─ application/        # Hooks and orchestration
│  ├─ core/               # Pure domain logic
│  ├─ ports/              # Interfaces (contracts)
│  └─ adapters/           # Platform implementations
│
└─ config/
   ├─ eslint/             # Shared ESLint configuration
   ├─ tsconfig/           # Shared TypeScript configuration
   └─ vite/               # Shared Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Run all apps in development mode
pnpm dev

# Build all packages
pnpm build

# Run linting
pnpm lint

# Run tests
pnpm test
```

## 📦 Packages

### Apps

- **@synth-video/web**: React web application
- **@synth-video/desktop-ui**: Electron renderer process (React)
- **@synth-video/desktop**: Electron main process

### Packages

- **@synth-video/ui**: Shared React component library (Design System)
- **@synth-video/application**: Business logic hooks and orchestration
- **@synth-video/core**: Pure domain logic (framework agnostic)
- **@synth-video/ports**: Interface definitions and contracts
- **@synth-video/adapters**: Platform-specific implementations

### Config

- **@synth-video/eslint-config**: Shared ESLint configuration
- **@synth-video/tsconfig**: Shared TypeScript configuration
- **@synth-video/vite-config**: Shared Vite configuration

## 🏗️ Architecture

This monorepo follows Clean Architecture principles:

```
┌──────────────────────────────────────────────┐
│                    Apps                       │
│  (web, desktop-ui, desktop)                  │
├──────────────────────────────────────────────┤
│                 Application                   │
│  (hooks, orchestration, state management)    │
├──────────────────────────────────────────────┤
│                    Core                       │
│  (entities, use cases, business rules)       │
├──────────────────────────────────────────────┤
│          Ports          │      Adapters      │
│  (interfaces/contracts) │ (implementations)  │
└──────────────────────────────────────────────┘
```

## 📝 License

MIT
# synth-video-monorepo
