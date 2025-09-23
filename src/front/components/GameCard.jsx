// src/components/GameCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameCard.module.css';

const GameCard = ({ gameId, playPath, nombre, descripcion }) => {
  const navigate = useNavigate();

  // Función para manejar el click del botón principal
  const handlePrimaryButtonClick = () => {
    switch (gameId) {
      case 'nacional':
        navigate('/agencias/nacional'); // Agencias específicas de nacional
        break;
      case 'mendoza':
        navigate('/agencias/mendoza'); // Agencias específicas de mendoza
        break;
      case 'quini6':
        navigate('/agencias/quini6');
        break;
      case 'loto':
        navigate('/agencias/loto');
        break;
      default:
        navigate(playPath);
    }
  };

  // Función para manejar resultados
  const handleResultsClick = () => {
    switch (gameId) {
      case 'nacional':
        navigate('/resultados?filtro=quiniela-nacional');
        break;
      case 'mendoza':
        navigate('/resultados?filtro=quiniela-mendoza');
        break;
      case 'quini6':
        navigate('/resultados?filtro=quini6');
        break;
      case 'loto':
        navigate('/resultados?filtro=loto');
        break;
      default:
        navigate('/resultados');
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