// src/pages/HomePage.jsx

import React from 'react';
import GameCard from '../components/GameCard'; // Importamos nuestro nuevo componente
import styles from './HomePage.module.css'; // Importamos los estilos de la página

// Más adelante, estos datos vendrán de tu API. Por ahora, los simulamos aquí.
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
      <h1 className={styles.pageTitle}>Bienvenido a Quiniela App</h1>
      <p className={styles.pageSubtitle}>Selecciona un juego para ver las agencias disponibles y realizar tu apuesta.</p>
      
      <div className={styles.gamesGrid}>
        {/* Usamos .map() para crear un componente GameCard por cada juego en nuestra lista */}
        {juegosDisponibles.map((juego) => (
          <GameCard
            key={juego.id} // "key" es importante para React en las listas
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