// src/pages/AllResultsPage.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockResults } from '../data/mockResults';
import QuinielaResultCard from '../components/QuinielaResultCard';
import PoceadoResultCard from '../components/PoceadoResultCard';
import styles from './AllResultsPage.module.css';

const AllResultsPage = () => {
  const [searchParams] = useSearchParams();
  const filtroUrl = searchParams.get('filtro');
  const [filtro, setFiltro] = useState('todos');

  // Efecto para establecer el filtro inicial basado en la URL
  useEffect(() => {
    if (filtroUrl && mockResults[filtroUrl]) {
      setFiltro(filtroUrl);
    }
  }, [filtroUrl]);

  const resultadosFiltrados = useMemo(() => {
    if (filtro === 'todos') {
      return Object.values(mockResults);
    }
    return mockResults[filtro] ? [mockResults[filtro]] : [];
  }, [filtro]);

  const juegos = Object.values(mockResults);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Últimos Resultados</h1>
        <p>Selecciona un juego para ver sus resultados más recientes.</p>
      </header>
      
      <div className={styles.filterContainer}>
        <button 
          onClick={() => setFiltro('todos')} 
          className={filtro === 'todos' ? styles.active : ''}
        >
          Todos
        </button>
        {juegos.map(juego => (
          <button 
            key={juego.id} 
            onClick={() => setFiltro(juego.id)} 
            className={filtro === juego.id ? styles.active : ''}
          >
            {juego.nombre}
          </button>
        ))}
      </div>
      
      <div className={styles.resultsGrid}>
        {resultadosFiltrados.map(resultado => {
          if (resultado.id.startsWith('quiniela')) {
            return <QuinielaResultCard key={resultado.id} resultado={resultado} />;
          } else {
            return <PoceadoResultCard key={resultado.id} resultado={resultado} />;
          }
        })}
      </div>
    </div>
  );
};

export default AllResultsPage;