// bannerService.js - Servicio para gestionar la lógica de aparición de banners

class BannerService {
  constructor() {
    this.bannerStates = {
      lateral: {
        left: { isActive: false, lastShown: null, interval: 30000 },
        right: { isActive: false, lastShown: null, interval: 35000 }
      },
      inferior: { isActive: false, lastShown: null, interval: 45000 }
    };

    this.settings = {
      maxSimultaneousBanners: 2,
      minTimeBetweenBanners: 5000, // 5 segundos mínimo entre banners
      respectUserInteraction: true, // Si el usuario cierra un banner, esperar más tiempo
      adaptiveInterval: true // Ajustar intervalos basado en interacciones
    };

    this.userInteractions = {
      closedBanners: 0,
      clickedBanners: 0,
      lastInteraction: null
    };

    this.init();
  }

  init() {
    // Inicializar timers y comportamientos
    this.setupBannerScheduler();
    this.loadUserPreferences();
  }

  setupBannerScheduler() {
    // Scheduler inteligente que evita solapamientos
    setInterval(() => {
      this.evaluateBannerDisplay();
    }, 2000); // Evaluar cada 2 segundos
  }

  evaluateBannerDisplay() {
    const now = Date.now();
    const activeBanners = this.getActiveBannersCount();

    // No mostrar más banners si ya hay demasiados activos
    if (activeBanners >= this.settings.maxSimultaneousBanners) {
      return;
    }

    // Evaluar banners laterales
    this.evaluateLateralBanners(now);

    // Evaluar banner inferior
    this.evaluateInferiorBanner(now);
  }

  evaluateLateralBanners(now) {
    ['left', 'right'].forEach(position => {
      const banner = this.bannerStates.lateral[position];

      if (!banner.isActive && this.shouldShowBanner(banner, now)) {
        this.scheduleBannerShow('lateral', position);
      }
    });
  }

  evaluateInferiorBanner(now) {
    const banner = this.bannerStates.inferior;

    if (!banner.isActive && this.shouldShowBanner(banner, now)) {
      this.scheduleBannerShow('inferior');
    }
  }

  shouldShowBanner(banner, now) {
    // Si nunca se mostró, aplicar delay aleatorio inicial
    if (!banner.lastShown) {
      return now > (this.getRandomDelay(3000, 8000));
    }

    // Verificar que haya pasado el intervalo mínimo
    const timeSinceLastShown = now - banner.lastShown;
    const adjustedInterval = this.getAdjustedInterval(banner.interval);

    return timeSinceLastShown >= adjustedInterval;
  }

  getAdjustedInterval(baseInterval) {
    if (!this.settings.adaptiveInterval) return baseInterval;

    // Aumentar intervalo si el usuario ha cerrado muchos banners
    const closeRatio = this.userInteractions.closedBanners / Math.max(1, this.userInteractions.clickedBanners + this.userInteractions.closedBanners);
    const multiplier = 1 + (closeRatio * 0.5); // Hasta 50% más tiempo si siempre cierra

    return Math.floor(baseInterval * multiplier);
  }

  scheduleBannerShow(type, position = null) {
    const delay = this.getRandomDelay(1000, 3000); // Delay aleatorio para naturalidad

    setTimeout(() => {
      this.showBanner(type, position);
    }, delay);
  }

  showBanner(type, position = null) {
    if (type === 'lateral' && position) {
      this.bannerStates.lateral[position].isActive = true;
      this.bannerStates.lateral[position].lastShown = Date.now();
    } else if (type === 'inferior') {
      this.bannerStates.inferior.isActive = true;
      this.bannerStates.inferior.lastShown = Date.now();
    }

    // Emitir evento personalizado para que los componentes reaccionen
    this.emitBannerEvent('show', { type, position });
  }

  hideBanner(type, position = null, userAction = false) {
    if (type === 'lateral' && position) {
      this.bannerStates.lateral[position].isActive = false;
    } else if (type === 'inferior') {
      this.bannerStates.inferior.isActive = false;
    }

    // Registrar interacción del usuario
    if (userAction) {
      this.userInteractions.closedBanners++;
      this.userInteractions.lastInteraction = Date.now();
    }

    this.emitBannerEvent('hide', { type, position, userAction });
  }

  bannerClicked(type, position = null) {
    this.userInteractions.clickedBanners++;
    this.userInteractions.lastInteraction = Date.now();
    this.hideBanner(type, position, false);

    this.emitBannerEvent('click', { type, position });
  }

  getActiveBannersCount() {
    let count = 0;

    if (this.bannerStates.lateral.left.isActive) count++;
    if (this.bannerStates.lateral.right.isActive) count++;
    if (this.bannerStates.inferior.isActive) count++;

    return count;
  }

  getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  emitBannerEvent(eventType, data) {
    const event = new CustomEvent(`banner-${eventType}`, {
      detail: data
    });
    window.dispatchEvent(event);
  }

  loadUserPreferences() {
    try {
      const prefs = localStorage.getItem('bannerPreferences');
      if (prefs) {
        const parsed = JSON.parse(prefs);
        this.userInteractions = { ...this.userInteractions, ...parsed };
      }
    } catch (error) {
      console.warn('No se pudieron cargar las preferencias de banner:', error);
    }
  }

  saveUserPreferences() {
    try {
      localStorage.setItem('bannerPreferences', JSON.stringify(this.userInteractions));
    } catch (error) {
      console.warn('No se pudieron guardar las preferencias de banner:', error);
    }
  }

  // Métodos públicos para configuración
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
  }

  getBannerState(type, position = null) {
    if (type === 'lateral' && position) {
      return this.bannerStates.lateral[position];
    } else if (type === 'inferior') {
      return this.bannerStates.inferior;
    }
    return null;
  }

  // Método para pausar temporalmente todos los banners
  pauseBanners(duration = 60000) { // Pausar por 1 minuto por defecto
    const originalSettings = { ...this.settings };
    this.settings.maxSimultaneousBanners = 0;

    setTimeout(() => {
      this.settings = originalSettings;
    }, duration);
  }

  // Destructor para limpiar recursos
  destroy() {
    this.saveUserPreferences();
    // Aquí se limpiarían los timers si los tuviéramos almacenados
  }
}

// Instancia singleton del servicio
const bannerService = new BannerService();

export default bannerService;