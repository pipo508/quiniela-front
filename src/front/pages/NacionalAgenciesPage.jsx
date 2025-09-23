// src/pages/NacionalAgenciesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { quinielas } from '../data/mockData';
import QuinielaCard from '../components/QuinielaCard';
import styles from './AgenciesPage.module.css';

const NacionalAgenciesPage = () => {
  // Filtra solo las agencias que ofrecen Quiniela Nacional
  const agenciasNacional = quinielas.filter(agencia => 
    agencia.games.includes('nacional')
  );

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Volver a los juegos</Link>
      
      <header className={styles.header}>
        <h1>Agencias - Quiniela Nacional</h1>
        <p>Elegí una agencia para jugar a la Quiniela Nacional</p>
      </header>

      <div className={styles.agenciesList}>
        {agenciasNacional.map(agencia => (
          <QuinielaCard 
            key={agencia.id}
            id={agencia.id}
            nombre={agencia.nombre}
            ubicacion={agencia.ubicacion}
            telefono={agencia.telefono}
            gameId="nacional"
            games={agencia.games}
          />
        ))}
      </div>

      {agenciasNacional.length === 0 && (
        <div className={styles.noAgencies}>
          <p>No hay agencias disponibles para Quiniela Nacional en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default NacionalAgenciesPage;