// src/components/QuinielaCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuinielaCard.module.css';

const QuinielaCard = ({ id, nombre, ubicacion, telefono, gameId }) => {
  // 👇 AQUÍ ESTÁ LA LÓGICA MEJORADA Y CORREGIDA 👇
  let destinationPath;

  if (gameId === 'quini6') {
    destinationPath = '/jugar/quini6';
  } else if (gameId === 'loto') {
    destinationPath = '/jugar/loto';
  } else {
    // Para cualquier otro caso ('nacional', 'mendoza', etc.), va a la quiniela tradicional.
    destinationPath = `/quiniela/${id}`;
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.nombre}>{nombre}</h3>
      <p className={styles.detalle}>📍 {ubicacion}</p>
      {telefono && <p className={styles.detalle}>📞 {telefono}</p>}
      
      {/* Usamos la ruta dinámica que acabamos de calcular */}
      <Link to={destinationPath} className={styles.link}>
        <button className={styles.button}>Seleccionar y Jugar</button>
      </Link>
    </div>
  );
};

export default QuinielaCard;