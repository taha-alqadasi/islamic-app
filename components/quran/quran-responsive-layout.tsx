@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom font for Quran text */
@font-face {
  font-family: "Quran";
  src: url("/fonts/UthmanicHafs.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.font-quran {
  font-family: "Quran", "Traditional Arabic", serif;
}

/* RTL support */
html[dir="rtl"] .rtl\:space-x-reverse > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}

/* Verse highlight animation */
@keyframes verse-highlight {
  0% {
    background-color: rgba(var(--primary), 0.3);
  }
  100% {
    background-color: rgba(var(--primary), 0.1);
  }
}

.verse-highlight {
  animation: verse-highlight 2s ease-out;
}

/* Word by word translation styles */
.word-by-word {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 4px;
  position: relative;
}

.word-by-word:hover .word-translation {
  visibility: visible;
  opacity: 1;
}

.word-translation {
  position: absolute;
  bottom: -24px;
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
  white-space: nowrap;
  z-index: 10;
}

/* Audio visualizer styles */
.audio-visualizer {
  display: flex;
  align-items: flex-end;
  height: 50px;
  width: 100%;
  gap: 2px;
}

.audio-bar {
  flex: 1;
  background-color: hsl(var(--primary));
  border-radius: 2px 2px 0 0;
  transition: height 0.1s ease;
}

/* Pulse animation for currently playing verse */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--primary), 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--primary), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--primary), 0);
  }
}

.pulse-animation {
  animation: pulse 2s infinite;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .font-quran {
    font-size: 20px !important;
  }
  
  .quran-controls {
    flex-direction: column;
    gap: 8px;
  }
  
  .quran-player-compact {
    padding: 8px !important;
  }
}

/* Night mode enhancements */
.night-mode .font-quran {
  color: #e2e8f0;
}

.night-mode .verse-active {
  background-color: rgba(79, 70, 229,

