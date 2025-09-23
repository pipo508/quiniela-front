// src/pages/HomePage.jsx

import React from 'react';
import GameCard from '../components/GameCard';
import styles from './HomePage.module.css';

const juegosDisponibles = [
  {
    id: 'nacional',
    play_path: '/juego/nacional',
    nombre: 'Quiniela Nacional',
    descripcion: 'Apostá en las agencias de la Quiniela Nacional.',
  },
  {
    id: 'mendoza',
    play_path: '/juego/mendoza',
    nombre: 'Quiniela de Mendoza',
    descripcion: 'Jugá en las agencias oficiales de la provincia de Mendoza.',
  },
  {
    id: 'quini6',
    play_path: '/juego/quini6',
    nombre: 'Quini 6',
    descripcion: 'Elegí 6 números y participá por pozos millonarios.',
  },
  {
    id: 'loto',
    play_path: '/juego/loto',
    nombre: 'Loto Plus',
    descripcion: 'Con 6 números participás en 4 sorteos. ¡Siempre hay un ganador!',
  },
];

const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Bienvenido a Quiniela App</h1>
        <p className={styles.pageSubtitle}>
          Selecciona un juego para ver las agencias disponibles, consultar los últimos resultados y realizar tu apuesta de forma rápida y segura.
        </p>
      </header>
      
      <h2 className={styles.gamesSectionTitle}>Nuestros Juegos</h2>

      <div className={styles.gamesGrid}>
        {juegosDisponibles.map((juego) => (
          <GameCard
            key={juego.id}
            gameId={juego.id}
            playPath={juego.play_path}
            nombre={juego.nombre}
            descripcion={juego.descripcion}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;