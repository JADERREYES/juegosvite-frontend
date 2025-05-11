import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TriviaGame = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [esCorrecta, setEsCorrecta] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/preguntas')
      .then(res => setPreguntas(res.data))
      .catch(err => console.error(err));
  }, []);

  const seleccionarRespuesta = (respuesta) => {
    setRespuestaSeleccionada(respuesta);
    const correcta = preguntas[preguntaActual].respuestaCorrecta;
    setEsCorrecta(respuesta === correcta);
    setMostrarRespuesta(true);
  };

  const siguientePregunta = () => {
    setRespuestaSeleccionada('');
    setMostrarRespuesta(false);
    setEsCorrecta(false);
    setPreguntaActual(prev => prev + 1);
  };

  if (preguntas.length === 0) return <div>Cargando preguntas...</div>;
  if (preguntaActual >= preguntas.length) return <div>Juego terminado 🎉</div>;

  const pregunta = preguntas[preguntaActual];

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h2>{pregunta.pregunta}</h2>
      <div>
        {pregunta.opciones.map((op, i) => (
          <button
            key={i}
            onClick={() => seleccionarRespuesta(op)}
            style={{
              margin: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: mostrarRespuesta && op === pregunta.respuestaCorrecta
                ? 'green'
                : mostrarRespuesta && op === respuestaSeleccionada
                ? 'red'
                : '',
              color: 'black',
              cursor: 'pointer'
            }}
            disabled={mostrarRespuesta}
          >
            {op}
          </button>
        ))}
      </div>

      {mostrarRespuesta && (
        <div style={{ marginTop: '1rem' }}>
          {esCorrecta ? '✅ ¡Correcto!' : '❌ Incorrecto'}
          <br />
          <button onClick={siguientePregunta} style={{ marginTop: '1rem' }}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default TriviaGame;
