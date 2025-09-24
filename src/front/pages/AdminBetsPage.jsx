// src/pages/AdminBetsPage.jsx
import React, { useState } from 'react';
import { mockBets } from '../data/mockBets';
import AdminBetCard from '../components/AdminBetCard';
import styles from './AdminBetsPage.module.css';

const AdminBetsPage = () => {
  const [bets, setBets] = useState(mockBets);
  const [filter, setFilter] = useState('pendiente'); // Filtro inicial

  const handleStatusChange = (betId, newStatus) => {
    setBets(currentBets =>
      currentBets.map(bet =>
        bet.id === betId ? { ...bet, estado: newStatus } : bet
      )
    );
  };

  const filteredBets = bets.filter(bet => filter === 'todos' || bet.estado === filter);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Gestión de Apuestas</h1>
        <p>Revisa y procesa las apuestas pendientes de los usuarios.</p>
      </header>
      
      <div className={styles.filterContainer}>
        <button onClick={() => setFilter('pendiente')} className={filter === 'pendiente' ? styles.active : ''}>Pendientes</button>
        <button onClick={() => setFilter('cargado')} className={filter === 'cargado' ? styles.active : ''}>Cargadas</button>
        <button onClick={() => setFilter('rechazado')} className={filter === 'rechazado' ? styles.active : ''}>Rechazadas</button>
        <button onClick={() => setFilter('todos')} className={filter === 'todos' ? styles.active : ''}>Todas</button>
      </div>

      <div className={styles.betsGrid}>
        {filteredBets.length > 0 ? (
          filteredBets.map(bet => (
            <AdminBetCard key={bet.id} bet={bet} onStatusChange={handleStatusChange} />
          ))
        ) : (
          <p className={styles.noBets}>No hay apuestas que coincidan con el filtro seleccionado.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBetsPage;