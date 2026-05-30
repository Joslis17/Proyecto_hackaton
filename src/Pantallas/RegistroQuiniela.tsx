import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registroQuinela.css';

// Definimos la estructura de un participante según lo que devuelve la API
interface Participante {
  id: string;
  name: string;
  photoUrl: string;
}

function RegistroQuiniela() {
  const navigate = useNavigate();
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Petición a la API al cargar la pantalla
  useEffect(() => {
    const obtenerParticipantes = async () => {
      try {
        const response = await fetch(
          'https://hackathon-quiniela.onrender.com/participants',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-team-token': 'PROGRAMMING-GIRLS', // Tu token de equipo
            },
          }
        );

        if (!response.ok) {
          throw new Error('No se pudieron cargar los participantes');
        }

        const data = await response.json();
        // Guardamos los datos en el estado (si la API devuelve un arreglo directo)
        setParticipantes(data);
      } catch (err) {
        console.error(err);
        setError('Hubo un error al obtener la lista de registros.');
      } finally {
        setLoading(false);
      }
    };

    obtenerParticipantes();
  }, []);

  return (
    <div className="registro-container">
      {/* Botón superior para volver al menú principal */}
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Volver al Inicio
      </button>

      <h2 className="registro-title">Participantes Registrados</h2>

      {loading && <p className="loading-text">Cargando participantes...</p>}
      {error && <p className="error-card">{error}</p>}

      {/* Si no hay errores ni está cargando, mostramos la lista */}
      {!loading && !error && (
        <div className="cards-grid">
          {participantes.length === 0 ? (
            <p className="no-data">
              No hay ningún participante registrado aún.
            </p>
          ) : (
            participantes.map((user) => (
              <div key={user.id || user.name} className="user-card">
                {/* Imagen tipo Perfil */}
                <div className="profile-img-container">
                  <img
                    src={user.photoUrl || 'https://via.placeholder.com/150'}
                    alt={user.name}
                    className="profile-img"
                    onError={(e) => {
                      // Si la URL de la imagen falla, pone una por defecto
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/150';
                    }}
                  />
                </div>

                {/* Nombre del Participante */}
                <h3 className="user-name">{user.name}</h3>

                {/* Botón de Crear Quiniela */}
                <button
                  className="create-quiniela-btn"
                  onClick={() => alert(`Creando quiniela para: ${user.name}`)}
                >
                  Crear Quiniela
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default RegistroQuiniela;
