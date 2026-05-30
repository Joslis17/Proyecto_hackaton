import './principal.css';
import { useNavigate } from 'react-router-dom';

function Principal() {
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h2 className="form-title">Bienvenido a la Quiniela</h2>

      <div className="custom-form">
        <button className="submit-btn" onClick={() => navigate('/formulario')}>
          Registrarme
        </button>

        <button
          className="submit-btn"
          onClick={() => navigate('/registro-quiniela')}
        >
          Ver Registro de la Quiniela
        </button>
      </div>
    </div>
  );
}

export default Principal;
