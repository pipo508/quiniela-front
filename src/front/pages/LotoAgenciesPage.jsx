// src/pages/LotoAgenciesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { quinielas } from '../data/mockData';
import styles from './AgenciesPage.module.css';

const LotoAgenciesPage = () => {
  // Filtra las agencias que ofrecen Loto
  const agenciasLoto = quinielas.filter(agencia => 
    agencia.games.includes('loto')
  );

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Volver a los juegos</Link>
      
      <header className={styles.header}>
        <h1>Agencias - Loto Plus</h1>
        <p>Elegí una agencia para jugar al Loto Plus</p>
      </header>

      <div className={styles.agenciesList}>
        {agenciasLoto.map(agencia => (
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
              <Link to="/jugar/loto" className={styles.playButton}>
                Jugar Loto Plus
              </Link>
            </div>
          </div>
        ))}
      </div>

      {agenciasLoto.length === 0 && (
        <div className={styles.noAgencies}>
          <p>No hay agencias disponibles para Loto Plus en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default LotoAgenciesPage;