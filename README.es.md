# Tienda de Productos Simple (Simple Product Shop)

![Status](https://img.shields.io/badge/status-activo-success.svg)
![React](https://img.shields.io/badge/react-v19.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-v5.7.2-blue.svg)
![Vite](https://img.shields.io/badge/vite-v6.1.0-646CFF.svg)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-v4.0.0-38B2AC.svg)
![Vitest](https://img.shields.io/badge/vitest-v3.0.4-729B1B.svg)

> [🇺🇸 Read in English](README.md)

Una aplicación de comercio electrónico moderna construida con React, TypeScript y Vite. Este proyecto demuestra las mejores prácticas en el desarrollo frontend, incluyendo una arquitectura de componentes significativa, estilos reutilizables con Tailwind CSS, pruebas rigurosas con Vitest/Playwright, y cumplimiento de accesibilidad (a11y).

## 🚀 Características

### Funcionalidad Principal
- **Catálogo de Productos**: Navegación de productos con estados de carga, efectos hover y diseño de cuadrícula responsivo.
- **Carrito de Compras**:
  - Agregar/eliminar artículos.
  - Actualizar cantidades.
  - Cálculo de subtotal en tiempo real.
  - **Sistema de Descuentos**:
    - **Descuento por Volumen**: 10% de descuento al comprar 10 o más del mismo artículo.
    - **Descuento de Pedido**: 20% de descuento cuando el total del carrito supera los $200.
    - Desglose visual de los ahorros en el resumen del carrito.

### Componentes e Interfaz (UI)
- **Sistema Global de Notificaciones (Toasts)**:
  - Notificaciones globales basadas en Contexto.
  - Variantes: Éxito, Error, Información.
  - Accesibles (alertas ARIA) y auto-descartables.
- **Skeletons de Carga**:
  - Componente `Skeleton` reutilizable (variantes de texto, rectangular, circular).
  - `ProductCardSkeleton` para experiencias de carga fluidas.
- **Formularios Accesibles**:
  - **LoginDemo**: Demuestra validación de formularios, manejo de errores y características de seguridad (bloqueo después de 3 intentos).
  - **PasswordInput**: Campo de contraseña reutilizable con alternancia de visibilidad, medidor de fuerza y lista de verificación de requisitos.
- **Accesibilidad (a11y)**:
  - Regiones `aria-live` para anuncios de lectores de pantalla (ej. actualizaciones del carrito).
  - Soporte de navegación por teclado (estilos `focus-visible`).
  - Estructura HTML semántica.
  - Utilidades `sr-only` para retroalimentación no visual.

## 🛠 Stack Tecnológico

- **Framework**: [React 19](https://react.dev/)
- **Herramienta de Construcción**: [Vite](https://vitejs.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Gestión de Estado**: React Context API (`CartContext`, `ToastContext`)
- **Pruebas**:
  - **Unitarias/Integración**: [Vitest](https://vitest.dev/) y [React Testing Library](https://testing-library.com/)
  - **E2E/Visuales**: [Playwright](https://playwright.dev/)

## 🛡️ Calidad y Herramientas (Quality Assurance)

Este proyecto utiliza un conjunto robusto de herramientas para garantizar la calidad del código, la accesibilidad y la estabilidad en producción.

### 🧩 Linting y Análisis Estático

- **[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)**:
  - **¿Qué es?**: Un plugin de ESLint que analiza estáticamente el JSX en busca de problemas de accesibilidad web.
  - **Importancia**: Es fundamental para garantizar que la aplicación sea inclusiva y utilizable por personas con discapacidades (lectores de pantalla, navegación por teclado). Detecta errores comunes como la falta de textos alternativos en imágenes (`alt`), uso incorrecto de roles ARIA, o etiquetas de formulario no asociadas. Cumplir con estas reglas mejora el SEO y la experiencia de usuario general.
  
- **[eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)**:
  - **¿Qué es?**: Conjunto de reglas avanzadas para detectar bugs, vulnerabilidades y "code smells" (malas prácticas) basadas en la lógica de SonarQube.
  - **Importancia**: Va más allá del estilo de código; ayuda a prevenir errores lógicos complejos (ej. condiciones siempre verdaderas/falsas), reduce la complejidad ciclomática (haciendo el código más fácil de entender) y fomenta la mantenibilidad a largo plazo.

### 🧪 Pruebas End-to-End (E2E)

- **[Playwright](https://playwright.dev/)**:
  - **¿Qué es?**: Un framework moderno de automatización para pruebas E2E (extremo a extremo).
  - **Importancia**: Permite simular interacciones reales de usuarios (iniciar sesión, agregar productos al carrito, completar compra) en múltiples motores de navegador (Chromium, Firefox, WebKit). A diferencia de los tests unitarios, Playwright verifica que todo el sistema funcione correctamente en conjunto, tal como lo experimentaría el usuario final.

### 🚨 Monitorización de Errores

- **[Sentry](https://sentry.io/)**:
  - **¿Qué es?**: Plataforma de monitoreo de errores y rendimiento de aplicaciones en tiempo real.
  - **Importancia**: En un entorno de producción, los errores son inevitables. Sentry captura excepciones no controladas en el navegador del usuario y envía reportes detallados con trazas de pila (stack traces), breadcrumbs (acciones previas al error) y contexto del dispositivo. Esto permite al equipo de desarrollo reaccionar y corregir bugs críticos antes de que afecten a más usuarios.

## 📊 Dashboard de Métricas

Hemos implementado un script personalizado para visualizar el estado de salud del proyecto de un vistazo.

### Ejecutar Métricas
```bash
npm run metrics
```

Este comando ejecuta una batería de análisis y muestra:
1. **🧪 Tests**: Estado de la última ejecución de pruebas unitarias.
2. **📈 Coverage**: Resumen de cobertura de código (Statements, Branches, Functions, Lines) con cabeceras claras.
3. **📝 Lint**: Estado del análisis estático (si existen errores o advertencias).
4. **📦 Bundle Size**: Tamaño de los archivos JS generados en `dist/` para producción.

### Análisis de Bundle (Visual)
Para un análisis profundo del peso de las librerías:
```bash
npm run build
```
Esto generará y abrirá automáticamente `stats.html`, un mapa interactivo (treemap) de todas las dependencias del proyecto.

## 📂 Estructura del Proyecto

```bash
src/
├── context/            # Estado global (CartContext, ToastContext)
├── features/           # Módulos basados en funcionalidades
│   ├── auth/           # Componentes de autenticación (LoginDemo, PasswordInput)
│   ├── product-catalog/# Listado de productos y tarjetas
│   └── shopping-cart/  # Gestión del carrito y resumen
├── shared/             # Recursos compartidos
│   ├── components/     # Componentes UI reutilizables (Toast, Skeleton)
│   ├── data/           # Datos simulados (Mock data)
│   ├── strategies/     # Patrones lógicos (Estrategias de descuento)
│   ├── types/          # Definiciones TypeScript
│   └── utils/          # Funciones auxiliares (formato moneda, validación)
├── test/               # Configuraciones globales de test y tests de integración
├── App.tsx             # Entrada principal de la aplicación
└── main.tsx            # Montaje en el DOM
```

## ⚡ Comenzando

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu- usuario/simple-product-shop.git
   cd simple-product-shop
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Ejecutando Pruebas

Este proyecto impone una alta calidad de código con pruebas exhaustivas.

- **Pruebas Unitarias**:
  ```bash
  npm run test
  ```
- **Cobertura de Pruebas**:
  ```bash
  npm run test:coverage
  ```
  *Cobertura Actual: ~89% Statements, ~76% Branches, 100% Functions.*

- **Linting**:
  ```bash
  npm run lint
  ```

## 🧪 Estrategia de Pruebas

El proyecto emplea **Desarrollo Guiado por Pruebas (TDD)** para la lógica crítica (ej. cálculos de descuento, validación de formularios).

- **Pruebas Unitarias**: Se centran en funciones de utilidad (`calculateSubtotal`, `validatePassword`) y componentes individuales de forma aislada.
- **Pruebas de Integración**: Verifican las interacciones entre proveedores (Cart, Toast) y componentes de características.
- **Regresión Visual**: Asegura la consistencia de la interfaz de usuario utilizando instantáneas de Playwright.

## 🎨 Decisiones de Diseño

1. **Context para el Estado**: Se utilizó `Context API` en lugar de Redux/Zustand debido a la complejidad moderada. `CartContext` y `ToastContext` desacoplan la lógica de manera efectiva.
2. **Patrón Strategy para Descuentos**: La lógica para calcular descuentos está encapsulada en clases de estrategia (`BulkDiscountStrategy`, `OrderDiscountStrategy`), lo que facilita agregar nuevos tipos de descuento sin modificar la lógica central del carrito.
3. **Accesibilidad Primero**: Los componentes se construyen pensando en los lectores de pantalla y usuarios de teclado desde el principio, no como una ocurrencia tardía.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
