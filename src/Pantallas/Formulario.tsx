import React, { useState } from 'react';
import './formulario.css';

import { useNavigate } from 'react-router-dom';

interface FormularioValores {
  name: string;
  photoUrl: string;
}

function Formulario() {
  const navigate = useNavigate();

  const [values, setValues] = useState<FormularioValores>({
    name: '',
    photoUrl: '',
  });

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (values.name === '' || values.photoUrl === '') {
      setError('Por favor, rellena todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://hackathon-quiniela.onrender.com/participants',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-team-token': 'PROGRAMMING-GIRLS',
          },
          body: JSON.stringify({
            name: values.name,
            photoUrl: values.photoUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      setSuccess(true);
      setValues({ name: '', photoUrl: '' });
      console.log('¡Registro completado con éxito!');
      navigate('/registro-quiniela');
    } catch (err) {
      console.error(err);
      setError('Hubo un problema al enviar los datos a la API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <button className="back-btn" onClick={() => navigate('/')}>
        ← Volver al Inicio
      </button>
    <div className="form-container">
      <h2 className="form-title">Registro Quiniela</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">¡Guardado correctamente!</p>}

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Ej. Tu Nombre o Equipo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagenUrl">URL de la Imagen</label>
          <input
            type="url"
            id="imagenUrl"
            name="photoUrl"
            value={values.photoUrl}
            placeholder="https://ejemplo.com/avatar.png"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Enviando...' : 'Registrar'}
        </button>
      </form>
    </div>
    </div>
    
  );
}

export default Formulario;
