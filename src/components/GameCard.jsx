// src/components/GameCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GameCard.module.css'; // Importamos los estilos del módulo

// Recibimos los datos del juego (id, nombre, descripcion) como "props"
const GameCard = ({ id, nombre, descripcion }) => {
  return (
    // Usamos Link para que toda la tarjeta sea un enlace a la página de ese juego
    <Link to={`/juego/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <h2 className={styles.title}>{nombre}</h2>
        <p className={styles.description}>{descripcion}</p>
        <button className={styles.button}>Ver Agencias</button>
      </div>
    </Link>
  );
};

export default GameCard;