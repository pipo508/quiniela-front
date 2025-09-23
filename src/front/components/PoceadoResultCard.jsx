// src/components/PoceadoResultCard.jsx
import React from 'react';
import styles from './ResultCards.module.css';

const PoceadoResultCard = ({ resultado }) => {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h3>{resultado.nombre} - Sorteo N° {resultado.sorteoNro}</h3>
        <p>{resultado.fecha}</p>
      </header>
      {resultado.nroPlus && (
        <div className={styles.nroPlus}>
          <span>NÚMERO PLUS</span>
          <strong>{resultado.nroPlus}</strong>
        </div>
      )}
      {resultado.modalidades.map(mod => (
        <div key={mod.titulo} className={styles.drawSection}>
          <h4>{mod.titulo}</h4>
          <div className={styles.poceadoNumbers}>
            {mod.numeros.map(n => <span key={n} className={styles.poceadoNumber}>{n}</span>)}
          </div>
          {mod.premios && (
            <table className={styles.prizeTable}>
              <thead><tr><th>Aciertos</th><th>Ganadores</th><th>Premio</th></tr></thead>
              <tbody>
                {mod.premios.map(p => (
                  <tr key={p.aciertos}><td>{p.aciertos}</td><td>{p.ganadores.toLocaleString('es-AR')}</td><td>${p.monto}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default PoceadoResultCard;