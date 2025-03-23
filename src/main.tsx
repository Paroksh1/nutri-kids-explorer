
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import * as React from 'react'
import { TooltipProvider } from './components/ui/tooltip'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </React.StrictMode>
);
