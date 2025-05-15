// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from './Page/Menu';
import { Game } from './Page/Game';
import { Settings } from './Page/Settings';
import {Ressources} from "./components/Ressources.jsx";

export function App() {
  const version = "0.0.1";

  return (
    <Routes>
      <Route path="/" element={<Menu version={version} />} />
      <Route path="/game" element={<Game />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="ressources" element={<Ressources />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}