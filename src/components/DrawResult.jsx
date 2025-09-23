// src/components/DrawResult.jsx
import React from 'react';
import styles from './DrawResult.module.css';

const DrawResult = ({ sorteo }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{sorteo.titulo}</h3>
        <div className={styles.cabeza}>
          <strong>Cabeza: {sorteo.cabeza.numero}</strong> - {sorteo.cabeza.significado}
        </div>
      </div>
      <div className={styles.grid}>
        {sorteo.lista.map((numero, index) => (
          <div key={index} className={styles.item}>
            <small>{index + 1}</small>
            <span className={index === 0 ? styles.numeroGanador : styles.numero}>
              {numero}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrawResult;