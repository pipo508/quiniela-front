// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
//  👇 CORRECCIÓN AQUÍ: Importa el módulo de CSS
import styles from './Navbar.module.css'; 

const Navbar = () => {
  return (
    // 👇 CORRECCIÓN AQUÍ: Usa el objeto 'styles' para las clases
    <nav className={styles.navbar}> 
      <Link to="/" className={styles.navbarBrand}>
        Quiniela App
      </Link>
      <div className={styles.navbarLinks}>
        <Link to="/">Juegos</Link>
        <Link to="/solicitud">Quiero ser parte</Link>
        <Link to="/admin/login">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;