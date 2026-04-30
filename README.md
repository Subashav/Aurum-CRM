# Aurum - Enterprise Revenue Operations

Aurum is a premium, high-fidelity CRM and revenue operations platform built with Next.js, Tailwind CSS, and Zustand.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install
```

### Development
```bash
# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build
```bash
# Create a production build
npm run build

# Start the production server
npm start
```

## 🛠 Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Components**: Custom built with a focus on premium aesthetics.

## 📁 Project Structure
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
  - `ui/`: Base atomic components (buttons, cards, etc.).
  - `navigation/`: Sidebar, Navbar, Command Palette.
  - `workspaces/`: Major feature-area components.
- `lib/`: Utility functions, store definitions, and data types.
  - `store/`: Zustand state management.
  - `crm-data.ts`: Mock data and core types.

## 🔧 Core Commands Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with hot-reload. |
| `npm run build` | Compiles the application for production. |
| `npm run start` | Runs the compiled production build. |
| `npm run lint` | Runs ESLint to check for code quality issues. |

## 📖 Development Guidelines
- **Branding**: Use the `<Logo />` component from `@/components/navigation/logo` for all brand representations.
- **Styling**: Use the `aurum-gradient` and `aurum-text-gradient` utility classes for brand-consistent colors.
- **State**: Access lead data via the `useLeadsStore` hook from `@/lib/store/leads`.
