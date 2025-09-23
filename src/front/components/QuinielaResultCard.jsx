// src/components/QuinielaResultCard.jsx
import React from 'react';
import styles from './ResultCards.module.css';

const QuinielaResultCard = ({ resultado }) => {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h3>{resultado.nombre}</h3>
        <p>{resultado.fecha}</p>
      </header>
      {resultado.sorteos.map(sorteo => (
        <div key={sorteo.titulo} className={styles.drawSection}>
          <h4>{sorteo.titulo}</h4>
          <div className={styles.cabeza}>
            A la cabeza: <strong>{sorteo.cabeza.numero}</strong> - {sorteo.cabeza.significado}
          </div>
          <div className={styles.quinielaGrid}>
            {sorteo.lista.map((numero, index) => (
              <div key={index} className={styles.quinielaItem}>
                <span>{index + 1}</span>
                <strong>{numero}</strong>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuinielaResultCard;