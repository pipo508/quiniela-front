// src/pages/ApplicationPage.jsx
import React, { useState } from 'react';

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
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombreTitular.trim()) {
      newErrors.nombreTitular = 'El nombre del titular es requerido';
    }

    if (!formData.dni.trim()) {
      newErrors.dni = 'El DNI es requerido';
    } else if (!/^\d{7,8}$/.test(formData.dni)) {
      newErrors.dni = 'El DNI debe tener 7 u 8 dígitos';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\+?\d{10,15}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Formato de teléfono inválido';
    }

    if (!formData.direccionAgencia.trim()) {
      newErrors.direccionAgencia = 'La dirección de la agencia es requerida';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!formData.documento) {
      newErrors.documento = 'Debe adjuntar un documento que valide la propiedad de la agencia';
    } else {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(formData.documento.type)) {
        newErrors.documento = 'Solo se permiten archivos PDF, JPG, JPEG o PNG';
      } else if (formData.documento.size > 5 * 1024 * 1024) {
        newErrors.documento = 'El archivo no puede superar los 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Aquí iría la llamada a la API
      // await submitApplication(formDataToSend);

      alert('Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.');

      // Resetear formulario
      setFormData({
        nombreTitular: '',
        dni: '',
        telefono: '',
        direccionAgencia: '',
        email: '',
        documento: null
      });

    } catch (error) {
      alert('Error al enviar la solicitud. Por favor, inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="application-page">
      <div className="application-container">
        <h1 className="application-title">Quiero ser parte</h1>
        <p className="application-subtitle">
          Completa el formulario para solicitar formar parte de nuestra red de agencias
        </p>

        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label htmlFor="nombreTitular">Nombre del Titular *</label>
            <input
              type="text"
              id="nombreTitular"
              name="nombreTitular"
              value={formData.nombreTitular}
              onChange={handleChange}
              className={errors.nombreTitular ? 'error' : ''}
              placeholder="Ingrese el nombre completo del titular"
            />
            {errors.nombreTitular && <span className="error-message">{errors.nombreTitular}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dni">DNI *</label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className={errors.dni ? 'error' : ''}
              placeholder="Ej: 12345678"
              maxLength="8"
            />
            {errors.dni && <span className="error-message">{errors.dni}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={errors.telefono ? 'error' : ''}
              placeholder="Ej: +54 9 11 1234-5678"
            />
            {errors.telefono && <span className="error-message">{errors.telefono}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="direccionAgencia">Dirección de la Agencia *</label>
            <textarea
              id="direccionAgencia"
              name="direccionAgencia"
              value={formData.direccionAgencia}
              onChange={handleChange}
              className={errors.direccionAgencia ? 'error' : ''}
              placeholder="Ingrese la dirección completa de la agencia"
              rows="3"
            />
            {errors.direccionAgencia && <span className="error-message">{errors.direccionAgencia}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email de Contacto *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="ejemplo@email.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="documento">Documento de Validación *</label>
            <input
              type="file"
              id="documento"
              name="documento"
              onChange={handleChange}
              className={errors.documento ? 'error' : ''}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <small className="file-help">
              Adjunte un documento que valide que es propietario de la agencia
              (habilitación municipal, contrato de alquiler, etc.).
              Formatos permitidos: PDF, JPG, PNG. Tamaño máximo: 5MB.
            </small>
            {errors.documento && <span className="error-message">{errors.documento}</span>}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .application-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .application-container {
          background: white;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .application-title {
          color: #2c3e50;
          font-size: 2.5rem;
          margin-bottom: 10px;
          text-align: center;
        }

        .application-subtitle {
          color: #7f8c8d;
          font-size: 1.1rem;
          text-align: center;
          margin-bottom: 40px;
        }

        .application-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8px;
          font-size: 1rem;
        }

        .form-group input,
        .form-group textarea {
          padding: 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3498db;
        }

        .form-group input.error,
        .form-group textarea.error {
          border-color: #e74c3c;
        }

        .error-message {
          color: #e74c3c;
          font-size: 0.875rem;
          margin-top: 5px;
        }

        .file-help {
          color: #7f8c8d;
          font-size: 0.875rem;
          margin-top: 5px;
          line-height: 1.4;
        }

        .submit-button {
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: 20px;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #2980b9, #1e6091);
        }

        .submit-button:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .application-page {
            padding: 10px;
          }

          .application-container {
            padding: 20px;
          }

          .application-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ApplicationPage;