// src/components/QuinielaCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuinielaCard.module.css';

const QuinielaCard = ({ id, nombre, ubicacion, telefono, gameId, games = [] }) => {
  let destinationPath;
  let buttonText;

  if (gameId === 'quini6') {
    destinationPath = '/jugar/quini6';
    buttonText = 'Jugar Quini 6';
  } else if (gameId === 'loto') {
    destinationPath = '/jugar/loto';
    buttonText = 'Jugar Loto Plus';
  } else {
    destinationPath = `/quiniela/${id}`;
    buttonText = 'Jugar Quiniela';
  }

  return (
    <div className={styles.card}>
      <div className={styles.agencyInfo}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.detalle}>📍 {ubicacion}</p>
        {telefono && <p className={styles.detalle}>📞 {telefono}</p>}
        
        {games && games.length > 0 && (
          <div className={styles.availableGames}>
            <strong>Juegos disponibles:</strong>
            <div className={styles.gamesList}>
              {games.includes('nacional') && <span className={styles.gameTag}>Quiniela Nacional</span>}
              {games.includes('mendoza') && <span className={styles.gameTag}>Quiniela Mendoza</span>}
              {games.includes('quini6') && <span className={styles.gameTag}>Quini 6</span>}
              {games.includes('loto') && <span className={styles.gameTag}>Loto Plus</span>}
            </div>
          </div>
        )}
      </div>

      <div className={styles.agencyActions}>
        <Link to={destinationPath} className={styles.link}>
          <button className={styles.button}>{buttonText}</button>
        </Link>
      </div>
    </div>
  );
};

export default QuinielaCard;