// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes y Páginas
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import QuinielaPage from './pages/QuinielaPage';
import ApplicationPage from './pages/ApplicationPage';
import ResultsPage from './pages/ResultsPage';

// Estilos
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/juego/:gameId" element={<GamesPage />} />
          <Route path="/quiniela/:quinielaId" element={<QuinielaPage />} />
          <Route path="/solicitud" element={<ApplicationPage />} />
          <Route path="/resultados/:gameId" element={<ResultsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;