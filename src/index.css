/* Google Fonts - must be first */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700&display=swap');

@import "tailwindcss";

/* ProfiTech Design System - Tailwind v4 */
@theme {
  /* Renk Paleti */
  --color-primary: #0F172A;
  --color-secondary: #2563EB;
  --color-accent: #22C55E;
  --color-background: #F8FAFC;
  --color-text: #111827;
  --color-muted: #64748B;
  --color-border: #E5E7EB;
  --color-card: #FFFFFF;
  --color-glow: rgba(37, 99, 235, 0.3);
  
  /* Admin Panel Renkleri */
  --color-admin-sidebar: #0B1220;
  --color-admin-card: #FFFFFF;
  --color-admin-border: #E5E7EB;
  --color-admin-primary: #2563EB;
  --color-admin-success: #22C55E;
  --color-admin-warning: #F59E0B;
  --color-admin-danger: #EF4444;
  
  /* Tipografi */
  --font-heading: 'Sora', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  
  /* Gölgeler */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-card: 0 4px 20px -2px rgb(15 23 42 / 0.08);
  --shadow-glow: 0 0 30px -5px rgba(37, 99, 235, 0.4);
}

/* Temel Stiller */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-background);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 600;
}

/* Özel Animasyonlar */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px -5px rgba(37, 99, 235, 0.3);
  }
  50% {
    box-shadow: 0 0 40px -5px rgba(37, 99, 235, 0.6);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Gradient Arka Plan */
.hero-gradient {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%);
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

/* Glow Efektleri */
.glow-effect {
  transition: all 0.3s ease;
}

.glow-effect:hover {
  box-shadow: var(--shadow-glow);
  border-color: rgba(37, 99, 235, 0.5);
}

/* Circuit Lines */
.circuit-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.3), transparent);
  height: 1px;
}

/* Scrollbar Stili */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #F1F5F9;
}

::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;
}

/* Selection */
::selection {
  background: rgba(37, 99, 235, 0.2);
  color: #0F172A;
}
