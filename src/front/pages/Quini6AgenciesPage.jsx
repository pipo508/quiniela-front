// src/pages/Quini6AgenciesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { quinielas } from '../data/mockData';
import styles from './AgenciesPage.module.css'; // Reutiliza los estilos existentes

const Quini6AgenciesPage = () => {
  // Filtra las agencias que ofrecen Quini 6
  const agenciasQuini6 = quinielas.filter(agencia => 
    agencia.games.includes('quini6')
  );

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>← Volver a los juegos</Link>
      
      <header className={styles.header}>
        <h1>Agencias - Quini 6</h1>
        <p>Elegí una agencia para jugar al Quini 6</p>
      </header>

      <div className={styles.agenciesList}>
        {agenciasQuini6.map(agencia => (
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
              <Link to="/jugar/quini6" className={styles.playButton}>
                Jugar Quini 6
              </Link>
            </div>
          </div>
        ))}
      </div>

      {agenciasQuini6.length === 0 && (
        <div className={styles.noAgencies}>
          <p>No hay agencias disponibles para Quini 6 en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default Quini6AgenciesPage;