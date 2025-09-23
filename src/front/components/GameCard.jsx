// src/components/GameCard.jsx

import React from 'react';
// 1. Importa 'useNavigate' en lugar de 'Link'
import { useNavigate } from 'react-router-dom';
import styles from './GameCard.module.css';

const GameCard = ({ gameId, playPath, nombre, descripcion }) => {
  // 2. Obtén la función de navegación
  const navigate = useNavigate();

  const primaryButtonText = gameId === 'quiniela' ? 'Ver Agencias' : 'Jugar Ahora';

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{nombre}</h2>
        <p className={styles.description}>{descripcion}</p>
      </div>
      <div className={styles.buttonGroup}>
        {/* 3. Elimina el <Link> y usa un onClick en el botón */}
        <button 
          className={styles.buttonPrimary}
          onClick={() => navigate(playPath)}
        >
          {primaryButtonText}
        </button>

        {gameId === 'quiniela' && (
          <button 
            className={styles.buttonSecondary}
            onClick={() => navigate(`/resultados/nacional`)}
          >
            Ver Resultados
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCard;