// src/pages/QuinielaAgenciesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { quinielas } from '../data/mockData';
import styles from './AgenciesPage.module.css';

const QuinielaAgenciesPage = () => {
  // Filtra las agencias que ofrecen quinielas (nacional o mendoza)
  const agenciasQuinielas = quinielas.filter(agencia => 
    agencia.games.includes('nacional') || agencia.games.includes('mendoza')
  );

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Volver a los juegos</Link>
      
      <header className={styles.header}>
        <h1>Agencias - Quinielas</h1>
        <p>Elegí una agencia para jugar a la Quiniela</p>
      </header>

      <div className={styles.agenciesList}>
        {agenciasQuinielas.map(agencia => (
          <div key={agencia.id} className={styles.agencyCard}>
            <div className={styles.agencyInfo}>
              <h3 className={styles.agencyName}>{agencia.nombre}</h3>
              <p className={styles.agencyLocation}>📍 {agencia.ubicacion}</p>
              <p className={styles.agencyPhone}>📞 {agencia.telefono}</p>
              <div className={styles.availableGames}>
                <strong>Juegos disponibles:</strong>
                <div className={styles.gamesList}>
                  {agencia.games.includes('nacional') && <span className={styles.gameTag}>Quiniela Nacional</span>}
                  {agencia.games.includes('mendoza') && <span className={styles.gameTag}>Quiniela Mendoza</span>}
                  {agencia.games.includes('quini6') && <span className={styles.gameTag}>Quini 6</span>}
                  {agencia.games.includes('loto') && <span className={styles.gameTag}>Loto Plus</span>}
                </div>
              </div>
            </div>
            <div className={styles.agencyActions}>
              {agencia.games.includes('nacional') && (
                <Link to="/juego/nacional" className={styles.playButton}>
                  Jugar Quiniela Nacional
                </Link>
              )}
              {agencia.games.includes('mendoza') && (
                <Link to="/juego/mendoza" className={styles.playButton}>
                  Jugar Quiniela Mendoza
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {agenciasQuinielas.length === 0 && (
        <div className={styles.noAgencies}>
          <p>No hay agencias disponibles para Quinielas en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default QuinielaAgenciesPage;