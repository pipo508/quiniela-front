// src/components/GameCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameCard.module.css';

const GameCard = ({ gameId, playPath, nombre, descripcion }) => {
  const navigate = useNavigate();

  // Función para manejar el click del botón principal
  const handlePrimaryButtonClick = () => {
    switch (gameId) {
      case 'quiniela':
        navigate('/agencias/quiniela'); // Va a ver agencias de quiniela
        break;
      case 'quini6':
        navigate('/agencias/quini6'); // Va a ver agencias de quini6
        break;
      case 'loto':
        navigate('/agencias/loto'); // Va a ver agencias de loto
        break;
      default:
        navigate(playPath); // Fallback al comportamiento original
    }
  };

  // Función para manejar resultados
  const handleResultsClick = () => {
    switch (gameId) {
      case 'quiniela':
        navigate('/resultados/nacional');
        break;
      case 'quini6':
        navigate('/resultados/quini6');
        break;
      case 'loto':
        navigate('/resultados/loto');
        break;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{nombre}</h2>
        <p className={styles.description}>{descripcion}</p>
      </div>
      <div className={styles.buttonGroup}>
        <button 
          className={styles.buttonPrimary}
          onClick={handlePrimaryButtonClick}
        >
          Ver Agencias
        </button>

        <button 
          className={styles.buttonSecondary}
          onClick={handleResultsClick}
        >
          Ver Resultados
        </button>
      </div>
    </div>
  );
};

export default GameCard;