// src/components/GameCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GameCard.module.css';

// Recibimos los datos del juego (id, nombre, descripcion) como "props"
const GameCard = ({ id, nombre, descripcion }) => {
  return (
    // Link wrapper que hace toda la tarjeta clickeable
    <Link to={`/juego/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <h2 className={styles.title}>{nombre}</h2>
        <p className={styles.description}>{descripcion}</p>
        <button className={styles.button} type="button">
          Ver Agencias
        </button>
      </div>
    </Link>
  );
};

export default GameCard;