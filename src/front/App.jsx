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
import AllResultsPage from './pages/AllResultsPage';
import Quini6AgenciesPage from './pages/Quini6AgenciesPage';
import LotoAgenciesPage from './pages/LotoAgenciesPage';
import NacionalAgenciesPage from './pages/NacionalAgenciesPage'; // 👈 Agregado
import MendozaAgenciesPage from './pages/MendozaAgenciesPage'; // 👈 Agregado

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
          <Route path="/resultados" element={<AllResultsPage />} />
          
          {/* Rutas para ver agencias específicas */}
          <Route path="/agencias/nacional" element={<NacionalAgenciesPage />} /> {/* 👈 Cambiado */}
          <Route path="/agencias/mendoza" element={<MendozaAgenciesPage />} /> {/* 👈 Agregado */}
          <Route path="/agencias/quini6" element={<Quini6AgenciesPage />} />
          <Route path="/agencias/loto" element={<LotoAgenciesPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;