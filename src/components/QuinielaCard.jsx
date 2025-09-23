// src/components/QuinielaCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuinielaCard.module.css';

const QuinielaCard = ({ id, nombre, ubicacion, telefono }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.nombre}>{nombre}</h3>
      <p className={styles.detalle}>📍 {ubicacion}</p>
      {telefono && <p className={styles.detalle}>📞 {telefono}</p>}
      <Link to={`/quiniela/${id}`} className={styles.link}>
        <button className={styles.button}>Seleccionar y Jugar</button>
      </Link>
    </div>
  );
};

export default QuinielaCard;