// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'; // 👈 1. Importa el servicio
import styles from './AuthForm.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('email'); // Usamos username
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // 2. Llama a la función del servicio, ¡mucho más limpio!
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al iniciar sesión.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>Login de Administrador</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Usuario</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>Iniciar Sesión</button>
        {/* El registro de admin no debería ser público, pero lo dejamos por ahora */}
        <p className={styles.linkText}>¿No tienes cuenta? <Link to="/admin/register">Regístrate</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;