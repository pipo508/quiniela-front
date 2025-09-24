// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú móvil
  const navigate = useNavigate();

  const checkAdminStatus = () => {
    const token = localStorage.getItem('adminToken');
    setIsAdminLoggedIn(!!token);
  };

  useEffect(() => {
    checkAdminStatus();
    window.addEventListener('storage', checkAdminStatus);
    return () => {
      window.removeEventListener('storage', checkAdminStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    checkAdminStatus();
    setMenuOpen(false); // Cierra el menú al desloguearse
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.navbarBrand} onClick={() => setMenuOpen(false)}>
          <img src="/assets/logo.png" alt="Quiniela App" className={styles.logo} />
        </NavLink>
        
        {/* Botón de menú hamburguesa para móviles */}
        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* La clase 'active' se añade condicionalmente para mostrar el menú en móviles */}
        <ul className={`${styles.navList} ${menuOpen ? styles.active : ''}`}>
          <li className={styles.navItem}>
            {/* Usamos 'end' para que 'Juegos' solo esté activo en la ruta exacta "/" */}
            <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setMenuOpen(false)}>
              Juegos
            </NavLink>
          </li>
          {/* NUEVO: Enlace a la página de resultados */}
          <li className={styles.navItem}>
            <NavLink to="/resultados" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setMenuOpen(false)}>
              Resultados
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/solicitud" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setMenuOpen(false)}>
              Quiero ser parte
            </NavLink>
          </li>
          
          {isAdminLoggedIn ? (
            <>
              <li className={styles.navItem}>
                <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setMenuOpen(false)}>
                  Dashboard
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <li className={styles.navItem}>
              <NavLink to="/admin/login" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={() => setMenuOpen(false)}>
                Admin Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;