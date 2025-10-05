# Clean Architecture Lab

An interactive learning platform for Clean Architecture and Domain-Driven Design, built with React, TypeScript, and Bun.

## Features

- 📚 **Interactive Tutorial**: Learn Clean Architecture concepts with visual explanations
- 🎨 **Visual Domain Builder**: Compose domain models with React Flow canvas
- 💻 **Live C# Code Generation**: See idiomatic C# generated from your domain model
- ✏️ **Interactive Exercises**: Write C# code and run tests directly in the browser
- 🎬 **3Blue1Brown-style Animations**: Beautiful explanations of Value Objects, Entities, and Aggregates
- 💾 **Local Persistence**: Save and load projects using localStorage

## Tech Stack

- **Runtime**: Bun
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS
- **Canvas**: React Flow
- **Editor**: Monaco Editor
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Testing**: Vitest + Playwright

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.0+

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start dev server
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building

```bash
# Production build
bun build
```

### Testing

```bash
# Run unit tests
bun test

# Run unit tests in watch mode
bun test -- --watch

# Run E2E tests
bun test:e2e

# Run E2E tests with UI
bun test:e2e:ui
```

## Project Structure

```
src/
├── features/
│   ├── animations/      # Framer Motion explanation animations
│   ├── canvas/          # React Flow domain model builder
│   │   ├── nodes/       # Custom node components
│   │   ├── store.ts     # Zustand graph state
│   │   └── validation.ts
│   ├── codegen/         # C# code generation
│   ├── exercises/       # Interactive C# exercises
│   └── persistence/     # localStorage helpers
├── shared/
│   ├── components/      # Reusable UI components
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Helper functions
├── wasm/               # .NET WASM bridge (stub)
└── App.tsx             # Main application
```

## Domain Concepts Covered

### Value Objects
- Immutability
- Equality by value
- Validation in factory methods

### Entities
- Identity over time
- Mutable attributes
- Domain methods

### Aggregates
- Consistency boundaries
- Aggregate roots
- Invariant enforcement

### Use Cases
- Application logic
- Repository (port) injection
- Input/Output DTOs

### Repositories (Ports)
- Interface abstraction
- Dependency inversion
- Infrastructure isolation

## Code Generation

The app generates clean, idiomatic C# targeting .NET 8:

- **Value Objects**: `readonly record struct` with validation
- **Entities**: Classes with private setters and domain methods
- **Aggregates**: Root entities with invariant enforcement
- **Repositories**: Interface definitions (ports)
- **Use Cases**: Classes with constructor injection

## Exercises

Four interactive exercises with in-browser test execution:

1. **Money Value Object**: Implement validation
2. **Ride Entity**: State transitions with guards
3. **Ride Aggregate**: Invariant enforcement
4. **Request Ride Use Case**: Orchestration logic

### C# Execution (WASM)

The exercises feature uses a **stub implementation**. To enable real C# execution:

1. Download .NET 8 WebAssembly runtime from Microsoft
2. Add Roslyn WASM for compilation
3. Create a managed test harness assembly
4. See `src/wasm/dotnet.ts` for detailed instructions

## Export/Import

- **Save**: Projects auto-save to localStorage
- **Export**: Download domain graph as JSON
- **Import**: Load JSON files

## Accessibility

- Keyboard navigation
- Semantic HTML
- High contrast mode support
- Respects `prefers-reduced-motion`

## Contributing

This is a demonstration project. Feel free to fork and extend!

## License

MIT

## Acknowledgments

- Inspired by Uncle Bob's Clean Architecture
- Eric Evans' Domain-Driven Design
- 3Blue1Brown's visual explanations
- The Bun, React, and TypeScript communities
