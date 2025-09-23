// src/pages/HomePage.jsx

import React from 'react';
import GameCard from '../components/GameCard';
import styles from './HomePage.module.css';

const juegosDisponibles = [
  {
    id: 'nacional',
    nombre: 'Quiniela Nacional',
    descripcion: 'Resultados y agencias de la quiniela a nivel nacional.',
  },
  {
    id: 'mendoza',
    nombre: 'Quiniela de Mendoza',
    descripcion: 'Resultados y agencias oficiales de la provincia de Mendoza.',
  },
];

const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      {/* NUEVO: Contenedor para la bienvenida */}
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Bienvenido a Quiniela App</h1>
        <p className={styles.pageSubtitle}>
          Selecciona un juego para ver las agencias disponibles, consultar los últimos resultados y realizar tu apuesta de forma rápida y segura.
        </p>
      </header>
      
      {/* NUEVO: Título para la sección de juegos */}
      <h2 className={styles.gamesSectionTitle}>Nuestros Juegos</h2>

      <div className={styles.gamesGrid}>
        {juegosDisponibles.map((juego) => (
          <GameCard
            key={juego.id}
            id={juego.id}
            nombre={juego.nombre}
            descripcion={juego.descripcion}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;