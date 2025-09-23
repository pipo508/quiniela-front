// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes y Páginas
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import QuinielaPage from './pages/QuinielaPage';
import ApplicationPage from './pages/ApplicationPage';
import ResultsPage from './pages/ResultsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import Quini6Page from './pages/Quini6Page';
import LotoPage from './pages/LotoPage';
import AllResultsPage from './pages/AllResultsPage'; // 👈 Importa la nueva página
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
          <Route path="/admin/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/jugar/quini6" element={<Quini6Page />} />
          <Route path="/jugar/loto" element={<LotoPage />} />
          <Route path="/resultados" element={<AllResultsPage />} /> {/* 👈 Añade */}


        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;