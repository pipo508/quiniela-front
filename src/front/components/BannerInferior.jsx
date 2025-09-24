import React, { useState, useEffect } from 'react';
import styles from './BannerInferior.module.css';

const BannerInferior = ({ interval = 45000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [progress, setProgress] = useState(0);

  const bannerPrototypes = [
    {
      id: 1,
      title: "🎉 ¡MEGA SORTEO ESPECIAL!",
      description: "Participá y ganá hasta $1.000.000 en premios. No te lo pierdas.",
      buttonText: "Participar Ahora",
      bgGradient: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
      icon: "🏆"
    },
    {
      id: 2,
      title: "📱 Nueva App Disponible",
      description: "Descarga nuestra app móvil y obtén un bono de bienvenida del 25%.",
      buttonText: "Descargar App",
      bgGradient: "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
      icon: "📲"
    },
    {
      id: 3,
      title: "🎯 Triple Oportunidad",
      description: "Con una sola apuesta, participás en 3 sorteos diferentes. ¡Más chances de ganar!",
      buttonText: "Jugar Ahora",
      bgGradient: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
      icon: "🎪"
    },
    {
      id: 4,
      title: "💎 VIP Club Exclusivo",
      description: "Únete al club VIP y accede a sorteos exclusivos y promociones especiales.",
      buttonText: "Ser VIP",
      bgGradient: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
      icon: "👑"
    }
  ];

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, Math.random() * 8000 + 3000); // Aparece entre 3-11 segundos

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setProgress(0);
    }, interval);

    // Progreso visual
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + (100 / (interval / 100));
      });
    }, 100);

    const bannerTimer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerPrototypes.length);
      setProgress(0);
    }, 15000); // Cambia banner cada 15 segundos

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(bannerTimer);
      clearInterval(progressTimer);
    };
  }, [interval]);

  const currentBannerData = bannerPrototypes[currentBanner];

  if (!isVisible) return null;

  return (
    <div
      className={styles.bannerContainer}
      style={{ background: currentBannerData.bgGradient }}
    >
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <button
        className={styles.closeButton}
        onClick={() => setIsVisible(false)}
        aria-label="Cerrar banner"
      >
        ✕
      </button>

      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={styles.iconContainer}>
            <span className={styles.mainIcon}>{currentBannerData.icon}</span>
            <div className={styles.sparkles}>
              <span className={styles.sparkle}>✨</span>
              <span className={styles.sparkle}>⭐</span>
              <span className={styles.sparkle}>💫</span>
            </div>
          </div>
        </div>

        <div className={styles.centerSection}>
          <h2 className={styles.title}>{currentBannerData.title}</h2>
          <p className={styles.description}>{currentBannerData.description}</p>
        </div>

        <div className={styles.rightSection}>
          <button className={styles.ctaButton}>
            {currentBannerData.buttonText}
            <span className={styles.buttonArrow}>→</span>
          </button>
        </div>
      </div>

      <div className={styles.decorativeElements}>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
      </div>
    </div>
  );
};

export default BannerInferior;