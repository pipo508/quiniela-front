// src/pages/GamesPage.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import QuinielaCard from '../components/QuinielaCard';
import styles from './GamesPage.module.css';
import { quinielas } from '../data/mockData'; // Importas los datos

const GamesPage = () => {
  const { gameId } = useParams();

  const quinielasParaMostrar = quinielas.filter(q => q.game === gameId);
  const nombreJuego = gameId.charAt(0).toUpperCase() + gameId.slice(1);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>&larr; Volver a los juegos</Link>
      <h1 className={styles.title}>Agencias disponibles para Quiniela {nombreJuego}</h1>

      {quinielasParaMostrar.length > 0 ? (
        <div className={styles.grid}>
          {quinielasParaMostrar.map(quiniela => (
            <QuinielaCard 
              key={quiniela.id} 
              {...quiniela}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>No se encontraron agencias para este juego.</p>
      )}
    </div>
  );
};

export default GamesPage; // <-- ASEGÚRATE DE QUE ESTA LÍNEA EXISTA