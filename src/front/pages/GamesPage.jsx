// src/pages/GamesPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import QuinielaCard from '../components/QuinielaCard';
import styles from './GamesPage.module.css';
import { quinielas } from '../data/mockData';

const GamesPage = () => {
  const { gameId } = useParams();

  // 👇 AQUÍ ESTÁ LA LÍNEA MODIFICADA
  const quinielasParaMostrar = quinielas.filter(q => q.games.includes(gameId));
  
  const nombreJuego = gameId.charAt(0).toUpperCase() + gameId.slice(1);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>&larr; Volver a los juegos</Link>
      <h1 className={styles.title}>Agencias disponibles para {nombreJuego}</h1>

      {quinielasParaMostrar.length > 0 ? (
        <div className={styles.grid}>
          {quinielasParaMostrar.map(quiniela => (
            <QuinielaCard 
              key={quiniela.id} 
              gameId={gameId} // 👈 AÑADE ESTA LÍNEA
              {...quiniela}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No se encontraron agencias para este juego.</p>
      )}
    </div>
  );
};

export default GamesPage;