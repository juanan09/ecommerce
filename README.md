# Simple Product Shop

![Status](https://img.shields.io/badge/status-active-success.svg)
![React](https://img.shields.io/badge/react-v19.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-v5.7.2-blue.svg)
![Vite](https://img.shields.io/badge/vite-v6.1.0-646CFF.svg)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-v4.0.0-38B2AC.svg)
![Vitest](https://img.shields.io/badge/vitest-v3.0.4-729B1B.svg)

> [🇪🇸 Leer en Español](README.es.md)

A modern e-commerce application built with React, TypeScript, and Vite. This project demonstrates best practices in frontend development, including meaningful component architecture, reusable styling with Tailwind CSS, rigorous testing with Vitest/Playwright, and accessibility (a11y) compliance.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse products with loading states, hover effects, and responsive grid layout.
- **Shopping Cart**:
  - Add/remove items.
  - Update quantities.
  - Real-time subtotal calculation.
  - **Discount System**:
    - **Bulk Discount**: 10% off when buying 10 or more of the same item.
    - **Order Discount**: 20% off when cart total exceeds $200.
    - Visual breakdown of savings in the cart summary.

### Components & UI
- **Global Toast Notification System**:
  - Context-based global notifications (Scope: Global).
  - Variants: Success, Error, Info.
  - Accessible (ARIA alerts) and auto-dismissable.
- **Loading Skeletons**:
  - Reusable `Skeleton` component (text, rectangular, circular variants).
  - `ProductCardSkeleton` for seamless loading experiences.
- **Accessible Forms**:
  - **LoginDemo**: Demonstrates form validation, error handling, and security features (lockout after 3 attempts).
  - **PasswordInput**: Reusable password field with visibility toggle, strength meter, and validation requirements checklist.
- **Accessibility (a11y)**:
  - `aria-live` regions for screen reader announcements (e.g., cart updates).
  - Keyboard navigation support (`focus-visible` styles).
  - Semantic HTML structure.
  - `sr-only` utilities for non-visual feedback.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: React Context API (`CartContext`, `ToastContext`)
- **Testing**:
  - **Unit/Integration**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
  - **E2E/Visual**: [Playwright](https://playwright.dev/)

## 🛡️ Quality Assurance & Tools (QA)

This project uses a robust set of tools to ensure code quality, accessibility, and stability in production.

### 🧩 Linting & Static Analysis

- **[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)**:
  - **What is it?**: An ESLint plugin that statically analyzes JSX for web accessibility issues.
  - **Importance**: Crucial for ensuring the app is inclusive and usable by people with disabilities (screen readers, keyboard navigation). It detects common errors like missing `alt` text on images, incorrect ARIA roles, or unassociated form labels. Compliance improves SEO and overall UX.
  
- **[eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)**:
  - **What is it?**: Use rules from SonarQube to detect bugs, vulnerabilities, and code smells.
  - **Importance**: Goes beyond code style; helps prevent complex logical errors (e.g., conditions that are always true/false), reduces cyclomatic complexity (making code easier to understand), and encourages long-term maintainability.

### 🧪 End-to-End (E2E) Testing

- **[Playwright](https://playwright.dev/)**:
  - **What is it?**: A modern automation framework for E2E testing.
  - **Importance**: Simulates real user interactions (logging in, adding items to cart, completing purchase) across multiple browser engines (Chromium, Firefox, WebKit). Unlike unit tests, Playwright verifies that the entire system works correctly together, just as an end-user would experience it.

### 🚨 Error Monitoring

- **[Sentry](https://sentry.io/)**:
  - **What is it?**: Real-time error and performance monitoring platform.
  - **Importance**: In production, errors are inevitable. Sentry captures unhandled exceptions in the user's browser and sends detailed reports with stack traces, breadcrumbs (user actions leading to error), and device context. This allows the dev team to react and fix critical bugs before they impact more users.

---

## 📊 Metrics Dashboard

We have implemented a custom script to visualize project health at a glance.

### Run Metrics
```bash
npm run metrics
```

This command runs a battery of analyses and displays:
1. **🧪 Tests**: Status of the latest unit test run.
2. **📈 Coverage**: Code coverage summary (Statements, Branches, Functions, Lines) with clear headers.
3. **📝 Lint**: Static analysis status (errors/warnings).
4. **📦 Bundle Size**: Size of JS files generated in `dist/` for production.

### Visual Bundle Analysis
For a deep dive into dependency weight:
```bash
npm run build
```
This will generate and automatically open `stats.html`, an interactive treemap of all project dependencies.

## 📂 Project Structure

```bash
src/
├── context/            # Global state (CartContext, ToastContext)
├── features/           # Feature-based modules
│   ├── auth/           # Authentication components (LoginDemo, PasswordInput)
│   ├── product-catalog/# Product listing & cards
│   └── shopping-cart/  # Cart management & summary
├── shared/             # Shared resources
│   ├── components/     # Reusable UI components (Toast, Skeleton)
│   ├── data/           # Mock data
│   ├── strategies/     # Logic patterns (Discount strategies)
│   ├── types/          # TypeScript definitions
│   └── utils/          # Helper functions (currency format, validation)
├── test/               # Global test setups & integration tests
├── App.tsx             # Main application entry
└── main.tsx            # DOM mounting
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/simple-product-shop.git
   cd simple-product-shop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Running Tests

This project enforces high code quality with comprehensive testing.

- **Unit Tests**:
  ```bash
  npm run test
  ```
- **Test Coverage**:
  ```bash
  npm run test:coverage
  ```
  *Current Coverage: ~89% Statements, ~76% Branches, 100% Functions.*

- **Linting**:
  ```bash
  npm run lint
  ```

## 🧪 Testing Strategy

The project employs **Test-Driven Development (TDD)** for critical logic (e.g., discount calculations, form validation).

- **Unit Tests**: Focus on utility functions (`calculateSubtotal`, `validatePassword`) and individual components in isolation.
- **Integration Tests**: Verify interactions between providers (Cart, Toast) and feature components.
- **Visual Regression**: Ensures UI consistency using Playwright snapshots.

## 🎨 Design Decisions

1. **Context for State**: Used `Context API` over Redux/Zustand due to moderate complexity. `CartContext` and `ToastContext` decouple logic effectively.
2. **Strategy Pattern for Discounts**: Logic for calculating discounts is encapsulated in strategy classes (`BulkDiscountStrategy`, `OrderDiscountStrategy`), making it easy to add new discount types without modifying the core cart logic.
3. **Accessibility First**: Components are built with screen readers and keyboard users in mind from the start, not as an afterthought.

## 📝 License

This project is licensed under the MIT License.
