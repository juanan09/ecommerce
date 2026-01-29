# Simple Product Shop

A modern e-commerce application built with React, TypeScript, and Tailwind CSS v4 following Test-Driven Development (TDD) principles.

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0 + TypeScript
- **Build Tool**: Vite (rolldown-vite)
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + TypeScript ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
pnpm dev
```

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Run tests with coverage

# Quality Assurance
npm run lint             # Run ESLint
npm run quality          # Run lint + typecheck + tests
npm run verify           # Run full validation (quality + build)
```

## 🏗️ Project Structure

```
src/
├── shared/                    # Shared code across features
│   ├── components/           # Reusable UI components
│   ├── constants/            # Application constants
│   ├── hooks/                # Custom React hooks
│   ├── strategies/           # Business logic strategies
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions
├── features/                  # Feature-specific modules
│   ├── product-catalog/      # Product listing and display
│   ├── shopping-cart/        # Cart management
│   └── auth/                 # Authentication features
├── context/                   # React Context providers
│   ├── CartContextValue.ts   # Context creation and types
│   ├── CartContext.tsx       # Context provider component
│   └── useCart.ts           # Custom context hook
├── infrastructure/            # External integrations
│   ├── sentry.ts            # Error monitoring setup
│   └── SentryErrorBoundary.tsx # Error boundary component
└── test/                     # Test configuration
    └── setup.ts             # Global test setup
```

## 🧪 Testing Strategy

This project follows **Test-Driven Development (TDD)**:

1. **Write tests first** - Tests must fail before implementation
2. **Implement minimum code** - Write just enough to make tests pass
3. **Refactor** - Improve code while keeping tests green

### Test Organization

- **Unit/Integration Tests**: Located alongside source files (`*.test.ts`, `*.test.tsx`)
- **Current Test Coverage**: 4 passing tests across 2 test files
- **Test Framework**: Vitest with jsdom environment

### Running Tests

```bash
# Watch mode for development
npm run test

# Single run for CI/CD
npm run test:run

# Coverage report
npm run test:coverage
```

## 📋 Development Guidelines

### File Organization (Scope Rule)

- `src/shared/` → Code used by multiple features
- `src/features/X/` → Code specific to one feature

### Key Configurations

#### TypeScript Configuration
- Tests excluded from `tsconfig.app.json`
- Project references setup for clean separation

#### React Context Pattern
Context split into 3 files to avoid react-refresh issues:
- `CartContextValue.ts` - Context creation and types (no components)
- `CartContext.tsx` - Context provider only
- `useCart.ts` - Custom hook only

### Code Quality

The project enforces code quality through:
- **ESLint**: JavaScript/TypeScript linting
- **TypeScript**: Static type checking
- **Testing**: Comprehensive test coverage
- **Build**: Production build validation

Run `npm run quality` to check all quality aspects, or `npm run verify` for full validation including build.

## 🛍️ Features

### Current Implementation
- **Product Catalog**: Display products with ProductCard components
- **Shopping Cart**: Add/remove items, calculate totals
- **State Management**: React Context for cart state
- **Business Logic**: Price formatting, bulk discounts, order calculations

### Business Rules
- Price formatting with currency display
- Bulk discount calculations based on quantity
- Subtotal calculations with discount support
- Cart item management with quantity controls

## 🔄 Development Workflow

1. **Feature Development**
   - Create feature in `src/features/`
   - Follow TDD: test → implement → refactor
   - Use shared utilities when applicable

2. **Quality Assurance**
   - Run `npm run quality` during development
   - Run `npm run verify` before commits
   - Ensure all tests pass and build succeeds

3. **Code Organization**
   - Keep feature-specific code contained
   - Extract reusable code to `src/shared/`
   - Follow established naming conventions

## 📊 Current Status

- **Tests**: 4 passing
- **Build**: ✅ Success
- **Lint**: ✅ No errors
- **Type Check**: ✅ No errors

## 🤝 Contributing

1. Follow the TDD approach
2. Maintain test coverage
3. Follow the established project structure
4. Run `npm run verify` before submitting changes

## 📄 License

Private project - All rights reserved.