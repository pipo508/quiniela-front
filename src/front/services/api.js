// src/services/api.js

import axios from 'axios';

// 1. CREAMOS UNA INSTANCIA DE AXIOS
// Esto nos permite tener una configuración centralizada para todas las llamadas a la API.
// Usamos una URL base relativa para que respete el "proxy" en tu package.json.
const apiClient = axios.create({
  baseURL: '/api', // Todas las rutas del backend empiezan con /api/...
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. CONFIGURAMOS UN "INTERCEPTOR"
// Esto es código que se ejecuta ANTES de cada petición. Es perfecto para
// adjuntar el token de autenticación a las peticiones que lo necesiten.
apiClient.interceptors.request.use(
  (config) => {
    // Recuperamos el token del localStorage
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Si el token existe, lo añadimos a la cabecera de autorización
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. DEFINIMOS TODAS LAS FUNCIONES DE LA API
// Envolvemos cada endpoint del backend en una función fácil de usar.

// --- Autenticación ---
export const login = (username, password) => {
  // Nota: tu backend espera 'username', no 'email' para el login.
  return apiClient.post('/auth/login', { username, password });
};

// --- Endpoints Públicos ---
export const submitApplication = (applicationData) => {
  return apiClient.post('/public/solicitudes', applicationData);
};

export const getActiveQuinielas = () => {
  return apiClient.get('/public/quinielas');
};

export const getActiveQuinielaById = (id) => {
  return apiClient.get(`/public/quinielas/${id}`);
};

export const sendTicketByEmail = (ticketData) => {
  // Nota: Tu backend espera 'email_destinatario' en lugar de 'email'.
  // Asegúrate de que el objeto ticketData tenga esa clave.
  return apiClient.post('/public/apuestas/enviar-ticket', ticketData);
};


// --- Endpoints de Administración (Protegidos por JWT) ---
// El interceptor se encargará de añadir el token automáticamente a todas estas llamadas.

export const getApplications = () => {
  return apiClient.get('/admin/solicitudes');
};

export const approveApplication = (id) => {
  return apiClient.post(`/admin/solicitudes/${id}/aprobar`);
};

export const rejectApplication = (id) => {
  return apiClient.post(`/admin/solicitudes/${id}/rechazar`);
};

export const getAdminQuinielas = () => {
  return apiClient.get('/admin/quinielas');
};

export const createQuiniela = (quinielaData) => {
  return apiClient.post('/admin/quinielas', quinielaData);
};

export const updateQuiniela = (id, quinielaData) => {
  return apiClient.put(`/admin/quinielas/${id}`, quinielaData);
};

export const deleteQuiniela = (id) => {
  return apiClient.delete(`/admin/quinielas/${id}`);
};

// Exportamos un objeto con todas las funciones para facilitar su importación
const api = {
  login,
  submitApplication,
  getActiveQuinielas,
  getActiveQuinielaById,
  sendTicketByEmail,
  getApplications,
  approveApplication,
  rejectApplication,
  getAdminQuinielas,
  createQuiniela,
  updateQuiniela,
  deleteQuiniela,
};

export default api;