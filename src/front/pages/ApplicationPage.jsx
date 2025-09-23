// src/pages/ApplicationPage.jsx
import React, { useState } from 'react';
import styles from './ApplicationPage.module.css'; // 👈 1. Importa el módulo CSS

const ApplicationPage = () => {
  const [formData, setFormData] = useState({
    nombreTitular: '',
    dni: '',
    telefono: '',
    direccionAgencia: '',
    email: '',
    documento: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombreTitular.trim()) newErrors.nombreTitular = 'El nombre del titular es requerido';
    if (!formData.dni.trim()) newErrors.dni = 'El DNI es requerido';
    else if (!/^\d{7,8}$/.test(formData.dni)) newErrors.dni = 'El DNI debe tener 7 u 8 dígitos';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    else if (!/^\+?\d{10,15}$/.test(formData.telefono.replace(/\s/g, ''))) newErrors.telefono = 'Formato de teléfono inválido';
    if (!formData.direccionAgencia.trim()) newErrors.direccionAgencia = 'La dirección de la agencia es requerida';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Formato de email inválido';
    if (!formData.documento) newErrors.documento = 'Debe adjuntar un documento que valide la propiedad de la agencia';
    else {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(formData.documento.type)) newErrors.documento = 'Solo se permiten archivos PDF, JPG, JPEG o PNG';
      else if (formData.documento.size > 5 * 1024 * 1024) newErrors.documento = 'El archivo no puede superar los 5MB';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      // Aquí iría la llamada a la API: await api.submitApplication(formDataToSend);
      alert('Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.');
      setFormData({ nombreTitular: '', dni: '', telefono: '', direccionAgencia: '', email: '', documento: null });
    } catch (error) {
      alert('Error al enviar la solicitud. Por favor, inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // 👇 2. Actualiza todos los className para usar el objeto 'styles'
    <div className={styles.applicationPage}>
      <div className={styles.applicationContainer}>
        <h1 className={styles.applicationTitle}>Quiero ser parte</h1>
        <p className={styles.applicationSubtitle}>
          Completa el formulario para solicitar formar parte de nuestra red de agencias
        </p>

        <form onSubmit={handleSubmit} className={styles.applicationForm}>
          <div className={styles.formGroup}>
            <label htmlFor="nombreTitular">Nombre del Titular *</label>
            <input
              type="text"
              id="nombreTitular"
              name="nombreTitular"
              value={formData.nombreTitular}
              onChange={handleChange}
              className={errors.nombreTitular ? styles.error : ''}
              placeholder="Ingrese el nombre completo del titular"
            />
            {errors.nombreTitular && <span className={styles.errorMessage}>{errors.nombreTitular}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dni">DNI *</label>
            <input type="text" id="dni" name="dni" value={formData.dni} onChange={handleChange} className={errors.dni ? styles.error : ''} placeholder="Ej: 12345678" maxLength="8" />
            {errors.dni && <span className={styles.errorMessage}>{errors.dni}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="telefono">Teléfono *</label>
            <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className={errors.telefono ? styles.error : ''} placeholder="Ej: +54 9 11 1234-5678" />
            {errors.telefono && <span className={styles.errorMessage}>{errors.telefono}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="direccionAgencia">Dirección de la Agencia *</label>
            <textarea id="direccionAgencia" name="direccionAgencia" value={formData.direccionAgencia} onChange={handleChange} className={errors.direccionAgencia ? styles.error : ''} placeholder="Ingrese la dirección completa de la agencia" rows="3" />
            {errors.direccionAgencia && <span className={styles.errorMessage}>{errors.direccionAgencia}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email de Contacto *</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? styles.error : ''} placeholder="ejemplo@email.com" />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="documento">Documento de Validación *</label>
            <input type="file" id="documento" name="documento" onChange={handleChange} className={errors.documento ? styles.error : ''} accept=".pdf,.jpg,.jpeg,.png" />
            <small className={styles.fileHelp}>
              Adjunte un documento que valide que es propietario de la agencia (habilitación municipal, contrato de alquiler, etc.). Formatos permitidos: PDF, JPG, PNG. Tamaño máximo: 5MB.
            </small>
            {errors.documento && <span className={styles.errorMessage}>{errors.documento}</span>}
          </div>

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </form>
      </div>
      {/* 3. El bloque <style jsx> se ha eliminado por completo */}
    </div>
  );
};

export default ApplicationPage;