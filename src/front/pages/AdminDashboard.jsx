// src/pages/AdminDashboard.jsx

import React, { useState } from 'react';
import styles from './AdminDashboard.module.css'; // Importamos los nuevos estilos

// Datos de ejemplo que simulan la respuesta de la API
const mockSolicitudes = [
  { id: 1, nombre_quiniela: 'Quiniela "El Sol"', nombre_solicitante: 'Juan Pérez', email_solicitante: 'juan.perez@email.com', estado: 'pendiente' },
  { id: 2, nombre_quiniela: 'Agencia de la Suerte', nombre_solicitante: 'Maria Garcia', email_solicitante: 'maria.garcia@email.com', estado: 'pendiente' },
  { id: 3, nombre_quiniela: 'Quiniela "El Trébol"', nombre_solicitante: 'Carlos López', email_solicitante: 'carlos.lopez@email.com', estado: 'aprobada' },
];

const AdminDashboard = () => {
  // Inicializamos el estado directamente con los datos mockeados
  const [solicitudes, setSolicitudes] = useState(mockSolicitudes);
  const [error, setError] = useState('');

  // NOTA: Eliminamos el `useEffect` ya que no estamos llamando a la API por ahora.

  // NUEVO: Función para manejar la aprobación o rechazo de una solicitud
  const handleProcessApplication = (id, nuevoEstado) => {
    // Aquí llamarías a la API en la versión final (ej: api.approveApplication(id))
    // Por ahora, solo actualizamos el estado local para simular el efecto.
    setSolicitudes(currentSolicitudes =>
      currentSolicitudes.map(sol =>
        sol.id === id ? { ...sol, estado: nuevoEstado } : sol
      )
    );
  };

  // Filtramos las solicitudes para mostrar solo las pendientes
  const solicitudesPendientes = solicitudes.filter(s => s.estado === 'pendiente');

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Panel de Administración</h1>
        <p>Gestiona las solicitudes de registro de nuevas agencias de quiniela.</p>
      </header>
      
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