// src/pages/LotoPage.jsx
import React, { useState } from 'react';
import styles from './Quini6Page.module.css'; // Reutilizamos los mismos estilos

const numerosDisponibles = Array.from({ length: 42 }, (_, i) => i);

// NUEVO: Definimos el precio fijo del Loto
const PRECIO_LOTO = 4000;

const LotoPage = () => {
  const [numerosSeleccionados, setNumerosSeleccionados] = useState(new Set());

  // ... (handleNumberClick no cambia)
  const handleNumberClick = (numero) => {
    setNumerosSeleccionados(prevNumeros => {
      const nuevosNumeros = new Set(prevNumeros);
      if (nuevosNumeros.has(numero)) nuevosNumeros.delete(numero);
      else if (nuevosNumeros.size < 6) nuevosNumeros.add(numero);
      return nuevosNumeros;
    });
  };

  const handleSubmit = () => {
    if (numerosSeleccionados.size !== 6) {
      alert('Debes seleccionar exactamente 6 números.');
      return;
    }
    const apuesta = {
      juego: 'loto',
      numeros: Array.from(numerosSeleccionados).sort((a, b) => a - b),
      costo: PRECIO_LOTO, // Añadimos el costo fijo
    };
    alert(`Apuesta de Loto confirmada:\n${JSON.stringify(apuesta, null, 2)}`);
  };

  return (
    <div className={styles.container}>
      {/* ... (header y selección de números no cambian) ... */}
      <header className={styles.header}>
        <h1>Jugá al Loto Plus</h1>
        <p>Elegí 6 números del 00 al 41. ¡Con tu jugada participás en 4 sorteos!</p>
      </header>
      <div className={styles.card}>
        <h2>Seleccioná tus números</h2>
        <div className={styles.numberGrid}>{numerosDisponibles.map(n => ( <button key={n} className={`${styles.numberButton} ${numerosSeleccionados.has(n) ? styles.selected : ''}`} onClick={() => handleNumberClick(n)} disabled={numerosSeleccionados.size >= 6 && !numerosSeleccionados.has(n)} > {String(n).padStart(2, '0')} </button> ))}</div>
      </div>
      <div className={styles.card}>
        <h2>Tus números seleccionados</h2>
        <div className={styles.selectionDisplay}>{numerosSeleccionados.size > 0 ? ( Array.from(numerosSeleccionados).sort((a, b) => a - b).map(n => ( <span key={n} className={styles.selectedNumber}>{String(n).padStart(2, '0')}</span> )) ) : ( <p className={styles.emptySelection}>Selecciona 6 números de la grilla de arriba.</p> )}</div>
      </div>

      {/* NUEVO: Tarjeta de resumen de compra */}
      <div className={`${styles.card} ${styles.summaryCard}`}>
        <h2>Resumen de Compra</h2>
        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <strong>Total a Pagar</strong>
          <strong>${PRECIO_LOTO.toLocaleString('es-AR')}</strong>
        </div>
      </div>

      <button className={styles.submitButton} onClick={handleSubmit} disabled={numerosSeleccionados.size !== 6}>
        Pagar y Confirmar Apuesta (${PRECIO_LOTO.toLocaleString('es-AR')})
      </button>
    </div>
  );
};

export default LotoPage;