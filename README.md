# Gardenscape 🌿

> A premium, immersive landing page for high-end gardening and landscaping services.

![Gardenscape Hero](https://images.unsplash.com/photo-1598555819385-a7455d31168f?w=1200&q=80)

## 📌 Project Overview

**Gardenscape** is a showcase of modern web performance and aesthetic design. Built with **Next.js 15**, **React Three Fiber**, and **Tailwind CSS**, it demonstrates how 3D visuals can be integrated into a functional marketing site without sacrificing accessibility or speed.

## ✨ Key Features

### 1. 3D Hero Experience
- **Suspense-Driven Loading**: 3D assets (`.obj`) are preloaded and rendered asynchronously to prevent blocking the main thread.
- **Scroll Phasing**: The animation state (Scatter → Circle → Arc) is strictly tied to scroll progress, ensuring the user is always in sync with the narrative.
- **Procedural Fallbacks**: Models gracefully degrade to algorithmic materials if textures fail to load.

### 2. High-Performance Animations
- **Spring Physics**: All motion (tilt, scroll, hover) uses `framer-motion` springs (`stiffness: 100`, `damping: 30`) for a natural, non-linear feel.
- **GPU Optimization**: Heavy elements utilize `will-change-transform` and backface culling to maintain 60FPS on mobile.

### 3. Premium UI/UX
- **Glassmorphism**: Real-time backdrop blur effects on the Services grid.
- **Horizontal Storytelling**: The Timeline section effectively turns vertical scroll into horizontal narrative progress.
- **Universal Floating Dock**: A persistent navigation bar that adapts from a mobile bottom-bar to a desktop floating dock.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Engine**: [React Three Fiber](https://r3f.docs.pmnd.rs/) (@react-three/drei)
- **Animation**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/gardenscape.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Mobile Optimization

This project is fully responsive.
- **3D Logic**: Complex floating animations are disabled on touch devices to save battery.
- **Layouts**: Grids automatically stack or switch to horizontal scrolls based on viewport width.
- **Touch**: All interactive elements have expanded hit areas (min 44px).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
