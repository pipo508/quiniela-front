// src/pages/ResultsPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockResults } from "../data/mockResults";
import DrawResult from '../components/DrawResult';
import styles from './ResultsPage.module.css';

const ResultsPage = () => {
  const { gameId } = useParams();
  const data = resultados[gameId];

  if (!data) {
    return (
      <div className={styles.container}>
        <h2>Resultados no disponibles</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  const nombreJuego = gameId.charAt(0).toUpperCase() + gameId.slice(1);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>&larr; Volver a los juegos</Link>
      <h1 className={styles.title}>Resultados Quiniela {nombreJuego}</h1>
      <p className={styles.subtitle}>Sorteos del día {data.fecha}</p>
      
      <div>
        {data.sorteos.map(sorteo => (
          <DrawResult key={sorteo.titulo} sorteo={sorteo} />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;