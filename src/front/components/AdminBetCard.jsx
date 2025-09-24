// src/components/AdminBetCard.jsx
import React from 'react';
import styles from './AdminBetCard.module.css';

const AdminBetCard = ({ bet, onStatusChange }) => {
  const { id, juego, apostadorEmail, fecha, estado, detalles } = bet;

  const renderBetDetails = () => {
    switch (juego) {
      case 'quiniela':
        return (
          <ul>
            {detalles.apuestas.map((a, i) => <li key={i}>{a.numero} ({a.tipo.texto}) - ${a.monto.toFixed(2)}</li>)}
          </ul>
        );
      case 'quini6':
      case 'loto':
        return <div className={styles.poceadoNumbers}>{detalles.numeros.join(' - ')}</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.card} ${styles[estado]}`}>
      <div className={styles.header}>
        <h3>{juego.toUpperCase()} - Ticket #{id}</h3>
        <span className={`${styles.statusBadge} ${styles[estado]}`}>{estado}</span>
      </div>
      <div className={styles.content}>
        <p><strong>Apostador:</strong> {apostadorEmail}</p>
        <p><strong>Fecha:</strong> {new Date(fecha).toLocaleString('es-AR')}</p>
        <div className={styles.details}>
          <strong>Detalles de la Apuesta:</strong>
          {renderBetDetails()}
        </div>
      </div>
      {estado === 'pendiente' && (
        <div className={styles.actions}>
          <button onClick={() => onStatusChange(id, 'cargado')} className={`${styles.button} ${styles.approve}`}>Marcar como Cargado</button>
          <button onClick={() => onStatusChange(id, 'rechazado')} className={`${styles.button} ${styles.reject}`}>Rechazar</button>
        </div>
      )}
    </div>
  );
};

export default AdminBetCard;