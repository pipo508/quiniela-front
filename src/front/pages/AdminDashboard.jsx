// src/pages/AdminDashboard.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const mockSolicitudes = [
  { id: 1, nombre_quiniela: 'Quiniela "El Sol"', nombre_solicitante: 'Juan Pérez', email_solicitante: 'juan.perez@email.com', estado: 'pendiente' },
  { id: 2, nombre_quiniela: 'Agencia de la Suerte', nombre_solicitante: 'Maria Garcia', email_solicitante: 'maria.garcia@email.com', estado: 'pendiente' },
  { id: 3, nombre_quiniela: 'Quiniela "El Trébol"', nombre_solicitante: 'Carlos López', email_solicitante: 'carlos.lopez@email.com', estado: 'aprobada' },
];

const AdminDashboard = () => {
  const [solicitudes, setSolicitudes] = useState(mockSolicitudes);
  const [error, setError] = useState('');

  const handleProcessApplication = (id, nuevoEstado) => {
    setSolicitudes(currentSolicitudes =>
      currentSolicitudes.map(sol =>
        sol.id === id ? { ...sol, estado: nuevoEstado } : sol
      )
    );
  };

  const solicitudesPendientes = solicitudes.filter(s => s.estado === 'pendiente');

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Panel de Administración</h1>
        <p>Gestiona las solicitudes de registro y las apuestas de los usuarios.</p>
      </header>
      
      <nav className={styles.adminNav}>
        <Link to="/admin/dashboard" className={styles.navLink}>
          Gestionar Solicitudes
        </Link>
        <Link to="/admin/apuestas" className={styles.navLink}>
          Gestionar Apuestas
        </Link>
      </nav>

      <div className={styles.card}>
        <h2>Solicitudes Pendientes</h2>
        {error && <p className={styles.error}>{error}</p>}

        {solicitudesPendientes.length > 0 ? (
          <ul className={styles.solicitudesList}>
            {solicitudesPendientes.map(solicitud => (
              <li key={solicitud.id} className={styles.solicitudItem}>
                <div className={styles.solicitudInfo}>
                  <strong>{solicitud.nombre_quiniela}</strong>
                  <span>Solicitante: {solicitud.nombre_solicitante} ({solicitud.email_solicitante})</span>
                </div>
                <div className={styles.solicitudActions}>
                  <button 
                    className={`${styles.button} ${styles.approveButton}`}
                    onClick={() => handleProcessApplication(solicitud.id, 'aprobada')}
                  >
                    Aprobar
                  </button>
                  <button 
                    className={`${styles.button} ${styles.rejectButton}`}
                    onClick={() => handleProcessApplication(solicitud.id, 'rechazada')}
                  >
                    Rechazar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noSolicitudes}>No hay solicitudes pendientes por revisar.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;