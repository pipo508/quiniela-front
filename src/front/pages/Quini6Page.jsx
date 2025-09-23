// src/pages/Quini6Page.jsx
import React, { useState, useMemo } from 'react';
import styles from './Quini6Page.module.css';

const numerosDisponibles = Array.from({ length: 46 }, (_, i) => i);

// NUEVO: Definimos los precios de cada modalidad
const PRECIOS = {
  TRADICIONAL: 2000,
  REVANCHA: 1000,
  SIEMPRE_SALE: 1000,
};

const Quini6Page = () => {
  const [numerosSeleccionados, setNumerosSeleccionados] = useState(new Set());
  const [juegaRevancha, setJuegaRevancha] = useState(false);
  const [juegaSiempreSale, setJuegaSiempreSale] = useState(false);

  // ... (las funciones handleNumberClick, handleSiempreSaleChange, handleRevanchaChange no cambian)
  const handleNumberClick = (numero) => {
    setNumerosSeleccionados(prevNumeros => {
      const nuevosNumeros = new Set(prevNumeros);
      if (nuevosNumeros.has(numero)) nuevosNumeros.delete(numero);
      else if (nuevosNumeros.size < 6) nuevosNumeros.add(numero);
      return nuevosNumeros;
    });
  };
  const handleSiempreSaleChange = () => {
    const nuevoValor = !juegaSiempreSale;
    setJuegaSiempreSale(nuevoValor);
    if (nuevoValor) setJuegaRevancha(true);
  };
  const handleRevanchaChange = () => {
    const nuevoValor = !juegaRevancha;
    setJuegaRevancha(nuevoValor);
    if (!nuevoValor) setJuegaSiempreSale(false);
  };

  // NUEVO: Calculamos el costo total dinámicamente
  const costoTotal = useMemo(() => {
    let total = PRECIOS.TRADICIONAL;
    if (juegaRevancha) total += PRECIOS.REVANCHA;
    if (juegaSiempreSale) total += PRECIOS.SIEMPRE_SALE;
    return total;
  }, [juegaRevancha, juegaSiempreSale]);

  const handleSubmit = () => {
    if (numerosSeleccionados.size !== 6) {
      alert('Debes seleccionar exactamente 6 números.');
      return;
    }
    const apuesta = {
      juego: 'quini6',
      numeros: Array.from(numerosSeleccionados).sort((a, b) => a - b),
      revancha: juegaRevancha,
      siempreSale: juegaSiempreSale,
      costo: costoTotal, // Añadimos el costo al objeto
    };
    alert(`Apuesta confirmada:\n${JSON.stringify(apuesta, null, 2)}`);
  };

  return (
    <div className={styles.container}>
      {/* ... (header y selección de números no cambian) ... */}
      <header className={styles.header}>
        <h1>Jugá al Quini 6</h1>
        <p>Elegí 6 números del 00 al 45 para participar.</p>
      </header>
      <div className={styles.card}>
        <h2>Seleccioná tus números</h2>
        <div className={styles.numberGrid}>{numerosDisponibles.map(n => ( <button key={n} className={`${styles.numberButton} ${numerosSeleccionados.has(n) ? styles.selected : ''}`} onClick={() => handleNumberClick(n)} disabled={numerosSeleccionados.size >= 6 && !numerosSeleccionados.has(n)} > {String(n).padStart(2, '0')} </button> ))}</div>
      </div>
      <div className={styles.card}>
        <h2>Tus números seleccionados</h2>
        <div className={styles.selectionDisplay}>{numerosSeleccionados.size > 0 ? ( Array.from(numerosSeleccionados).sort((a, b) => a - b).map(n => ( <span key={n} className={styles.selectedNumber}>{String(n).padStart(2, '0')}</span> )) ) : ( <p className={styles.emptySelection}>Selecciona 6 números de la grilla de arriba.</p> )}</div>
      </div>

      <div className={styles.card}>
        <h2>Modalidades Adicionales</h2>
        <div className={styles.options}>
          <label className={styles.checkboxContainer}><input type="checkbox" checked={juegaRevancha} onChange={handleRevanchaChange} /> Jugar Revancha (Opcional)</label>
          <label className={styles.checkboxContainer}><input type="checkbox" checked={juegaSiempreSale} onChange={handleSiempreSaleChange} /> Jugar Siempre Sale (Requiere Revancha)</label>
        </div>
      </div>
      
      {/* NUEVO: Tarjeta de resumen de compra */}
      <div className={`${styles.card} ${styles.summaryCard}`}>
        <h2>Resumen de Compra</h2>
        <div className={styles.summaryRow}>
          <span>Jugada Tradicional</span>
          <span>${PRECIOS.TRADICIONAL.toLocaleString('es-AR')}</span>
        </div>
        {juegaRevancha && (
          <div className={styles.summaryRow}>
            <span>Adicional Revancha</span>
            <span>${PRECIOS.REVANCHA.toLocaleString('es-AR')}</span>
          </div>
        )}
        {juegaSiempreSale && (
          <div className={styles.summaryRow}>
            <span>Adicional Siempre Sale</span>
            <span>${PRECIOS.SIEMPRE_SALE.toLocaleString('es-AR')}</span>
          </div>
        )}
        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <strong>Total a Pagar</strong>
          <strong>${costoTotal.toLocaleString('es-AR')}</strong>
        </div>
      </div>

      <button className={styles.submitButton} onClick={handleSubmit} disabled={numerosSeleccionados.size !== 6}>
        Pagar y Confirmar Apuesta (${costoTotal.toLocaleString('es-AR')})
      </button>
    </div>
  );
};

export default Quini6Page;