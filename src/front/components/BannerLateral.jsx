import React, { useState, useEffect } from 'react';
import styles from './BannerLateral.module.css';

const BannerLateral = ({ position = 'left', interval = 30000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  const bannerPrototypes = [
    {
      id: 1,
      title: "¡Promoción Especial!",
      subtitle: "Hasta 50% OFF",
      description: "En tu primera apuesta",
      color: "#ff6b35",
      bgGradient: "linear-gradient(135deg, #ff6b35, #f7931e)"
    },
    {
      id: 2,
      title: "Nuevo Juego",
      subtitle: "Súper Quiniela",
      description: "Mayores premios te esperan",
      color: "#4ecdc4",
      bgGradient: "linear-gradient(135deg, #4ecdc4, #44a08d)"
    },
    {
      id: 3,
      title: "App Móvil",
      subtitle: "¡Descárgala ya!",
      description: "Apuestas desde tu celular",
      color: "#a8e6cf",
      bgGradient: "linear-gradient(135deg, #a8e6cf, #7fcdcd)"
    }
  ];

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, Math.random() * 5000 + 2000); // Aparece entre 2-7 segundos

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, interval);

    const bannerTimer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerPrototypes.length);
    }, 10000); // Cambia banner cada 10 segundos

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(bannerTimer);
    };
  }, [interval]);

  const currentBannerData = bannerPrototypes[currentBanner];

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.bannerContainer} ${styles[position]}`}
      style={{ background: currentBannerData.bgGradient }}
    >
      <button
        className={styles.closeButton}
        onClick={() => setIsVisible(false)}
        aria-label="Cerrar banner"
      >
        ×
      </button>

      <div className={styles.content}>
        <div className={styles.icon}>
          🎯
        </div>
        <h3 className={styles.title}>{currentBannerData.title}</h3>
        <h4 className={styles.subtitle}>{currentBannerData.subtitle}</h4>
        <p className={styles.description}>{currentBannerData.description}</p>
        <button className={styles.ctaButton}>
          Ver más
        </button>
      </div>

      <div className={styles.pulse}></div>
    </div>
  );
};

export default BannerLateral;