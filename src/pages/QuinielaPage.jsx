// src/pages/QuinielaPage.jsx

import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // 👈 Importa axios
import { quinielas } from '../data/mockData';
import styles from './QuinielaPage.module.css';

// ... la función calcularPremio y la constante tiposDeApuesta se mantienen igual ...
const calcularPremio = (numero, monto, tipo) => {
    // ... lógica sin cambios
    let multiplicadorBase;
    switch (numero.length) {
      case 1: multiplicadorBase = 7; break;
      case 2: multiplicadorBase = 70; break;
      case 3: multiplicadorBase = 500; break;
      case 4: multiplicadorBase = 3500; break;
      default: multiplicadorBase = 0;
    }
    switch (tipo.valor) {
      case 'cabeza': return monto * multiplicadorBase;
      case 'premios_5': return monto * (multiplicadorBase / 5);
      case 'premios_10': return monto * (multiplicadorBase / 10);
      case 'premios_15': return monto * (multiplicadorBase / 15);
      case 'premios_20': return monto * (multiplicadorBase / 20);
      default: return 0;
    }
};
const tiposDeApuesta = [
    { valor: 'cabeza', texto: 'A la Cabeza' },
    { valor: 'premios_5', texto: 'A los 5' },
    { valor: 'premios_10', texto: 'A los 10' },
    { valor: 'premios_15', texto: 'A los 15' },
    { valor: 'premios_20', texto: 'A los 20' },
];


const QuinielaPage = () => {
  const { quinielaId } = useParams();
  const [numero, setNumero] = useState('');
  const [monto, setMonto] = useState('');
  const [tipoApuesta, setTipoApuesta] = useState(tiposDeApuesta[0]);
  const [apuestas, setApuestas] = useState([]);
  const [email, setEmail] = useState('');
  const quiniela = quinielas.find(q => q.id === Number(quinielaId));

  // NUEVO: Estados para manejar la llamada a la API
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({ message: '', type: '' }); // type: 'success' o 'error'

  // ... handleAgregarApuesta y handleEliminarApuesta se mantienen igual ...
  const handleAgregarApuesta = (e) => {
    e.preventDefault();
    if (!numero.trim() || isNaN(parseFloat(monto)) || parseFloat(monto) <= 0 || numero.length < 1) {
      alert('Por favor, ingresa un número (de 1 a 4 cifras) y un monto válido.');
      return;
    }
    const montoNum = parseFloat(monto);
    const premioPotencial = calcularPremio(numero, montoNum, tipoApuesta);
    setApuestas([...apuestas, { numero, monto: montoNum, tipo: tipoApuesta, premio: premioPotencial }]);
    setNumero('');
    setMonto('');
  };
  const handleEliminarApuesta = (indice) => {
    setApuestas(apuestas.filter((_, i) => i !== indice));
  };


  const montoTotal = useMemo(() => apuestas.reduce((total, apuesta) => total + apuesta.monto, 0), [apuestas]);
  const premioTotal = useMemo(() => apuestas.reduce((total, apuesta) => total + apuesta.premio, 0), [apuestas]);

  // MODIFICADO: La función ahora es asíncrona y usa axios
  const handleSubmitFinal = async (e) => {
    e.preventDefault();
    if (apuestas.length === 0) {
      setApiStatus({ message: 'Debes agregar al menos una apuesta.', type: 'error' });
      return;
    }
    if (!email.trim()) {
      setApiStatus({ message: 'Por favor, ingresa tu email para recibir el ticket.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setApiStatus({ message: '', type: '' });

    const ticketData = {
      quinielaId: quiniela.id,
      quinielaNombre: quiniela.nombre,
      email,
      apuestas,
      montoTotal,
      premioTotal,
    };

    try {
      // Esta es la llamada a tu backend. Asegúrate de que el endpoint exista en tu servidor Flask.
      // Si tu backend corre en otro puerto (ej: 5000), deberás configurar la URL completa.
      await axios.post('/api/enviar-ticket', ticketData);
      
      setApiStatus({ message: '¡Ticket enviado! Revisa tu correo electrónico.', type: 'success' });
      setApuestas([]);
      setEmail('');
    } catch (error) {
      console.error("Error al enviar el ticket:", error);
      // Mensaje de error genérico para el usuario
      setApiStatus({ message: 'No se pudo enviar el ticket. Inténtalo de nuevo más tarde.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  
  // ... el resto del componente se mantiene igual hasta el formulario final ...
  if (!quiniela) { return ( <h2>Quiniela no encontrada</h2> ); }

  return (
    <div className={styles.container}>
        {/* ... detailsCard y formCard se mantienen igual ... */}
        <div className={styles.detailsCard}>
            <h1>{quiniela.nombre}</h1>
            <p>Estás jugando en: {quiniela.ubicacion}</p>
        </div>
        <form className={styles.formCard} onSubmit={handleAgregarApuesta}>
            <h2>Arma tu jugada</h2>
            <div className={styles.addBetRow}>
            <div className={styles.inputGroup}><label htmlFor="numero">Número (1-4 cifras)</label><input type="text" id="numero" value={numero} onChange={(e) => setNumero(e.target.value.replace(/[^0-9]/g, ''))} placeholder="Ej: 1982" maxLength="4"/></div>
            <div className={styles.inputGroup}><label htmlFor="tipo">Tipo de Apuesta</label><select id="tipo" className={styles.select} value={tipoApuesta.valor} onChange={(e) => setTipoApuesta(tiposDeApuesta.find(t => t.valor === e.target.value))}>{tiposDeApuesta.map(tipo => (<option key={tipo.valor} value={tipo.valor}>{tipo.texto}</option>))}</select></div>
            <div className={styles.inputGroup}><label htmlFor="monto">Monto $</label><input type="text" id="monto" value={monto} onChange={(e) => setMonto(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="Ej: 100"/></div>
            <button type="submit" className={styles.addButton}>Agregar</button>
            </div>
        </form>

        {/* MODIFICADO: El formulario final ahora muestra mensajes de estado y carga */}
        <form className={styles.ticketCard} onSubmit={handleSubmitFinal}>
            {/* ... la lista de apuestas se mantiene igual ... */}
            <h2>Tu Ticket</h2>
            {apuestas.length === 0 ? (<p className={styles.emptyTicket}>Aún no has agregado ninguna apuesta.</p>) : (<ul className={styles.betList}>{apuestas.map((apuesta, index) => (<li key={index} className={styles.betItem}><div className={styles.betInfo}><span>Número: <strong>{apuesta.numero}</strong></span><small>Tipo: {apuesta.tipo.texto}</small><span>Apostado: <strong>${apuesta.monto.toFixed(2)}</strong></span></div><div className={styles.betPrize}><span>Premio Potencial: <strong>${apuesta.premio.toFixed(2)}</strong></span><button type="button" onClick={() => handleEliminarApuesta(index)} className={styles.deleteButton}>×</button></div></li>))}</ul>)}

            <div className={styles.summary}>
                <div className={styles.summaryCost}><span>Total a Pagar</span><strong>${montoTotal.toFixed(2)}</strong></div>
                <div className={styles.summaryPrize}><span>💰 Ganancia Potencial</span><strong>${premioTotal.toFixed(2)}</strong></div>
                <div className={styles.inputGroup}><label htmlFor="email">Ingresa tu Email para recibir el ticket</label><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" required/></div>
                
                {/* NUEVO: Lógica para mostrar mensajes y estado de carga */}
                {apiStatus.message && (
                    <div className={apiStatus.type === 'success' ? styles.statusSuccess : styles.statusError}>
                        {apiStatus.message}
                    </div>
                )}

                <button type="submit" className={styles.confirmButton} disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Confirmar y Enviar Ticket'}
                </button>
            </div>
        </form>
    </div>
  );
};

export default QuinielaPage;