// src/pages/MendozaAgenciesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { quinielas } from '../data/mockData';
import QuinielaCard from '../components/QuinielaCard';
import styles from './AgenciesPage.module.css';

const MendozaAgenciesPage = () => {
  // Filtra solo las agencias que ofrecen Quiniela de Mendoza
  const agenciasMendoza = quinielas.filter(agencia => 
    agencia.games.includes('mendoza')
  );

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Volver a los juegos</Link>
      
      <header className={styles.header}>
        <h1>Agencias - Quiniela de Mendoza</h1>
        <p>Elegí una agencia para jugar a la Quiniela de Mendoza</p>
      </header>

      <div className={styles.agenciesList}>
        {agenciasMendoza.map(agencia => (
          <QuinielaCard 
            key={agencia.id}
            id={agencia.id}
            nombre={agencia.nombre}
            ubicacion={agencia.ubicacion}
            telefono={agencia.telefono}
            gameId="mendoza"
            games={agencia.games}
          />
        ))}
      </div>

      {agenciasMendoza.length === 0 && (
        <div className={styles.noAgencies}>
          <p>No hay agencias disponibles para Quiniela de Mendoza en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default MendozaAgenciesPage;