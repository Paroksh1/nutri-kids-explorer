
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure we're not duplicating React.StrictMode
createRoot(document.getElementById("root")!).render(
  <App />
);
