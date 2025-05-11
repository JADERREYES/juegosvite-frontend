// src/App.jsx
import React, { useState } from 'react';
import './App.css';

const temasDisponibles = ['Historia','Ciencia','Arte','Geografía','Deportes'];

function App() {
  const [tema, setTema] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const obtenerPreguntas = async () => {
    if (!tema) return alert('Selecciona un tema');
    setLoading(true);
    setPreguntas([]);
    try {
      const res = await fetch(`${API_URL}/preguntas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema }),
      });
      const data = await res.json();
      setPreguntas(data.preguntas.map((p, idx) => ({
        ...p,
        userAnswer: null,  // para guardarla al seleccionar
        idx
      })));
    } catch (err) {
      console.error(err);
      alert('Error al obtener preguntas');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (qIdx, option) => {
    setPreguntas(prev =>
      prev.map(p =>
        p.idx === qIdx ? { ...p, userAnswer: option } : p
      )
    );
  };

  return (
    <div className="app-container">
      <h1>Juego JF Reyes IA</h1>
      <div className="selector">
        <select value={tema} onChange={e => setTema(e.target.value)}>
          <option value="">-- Selecciona Tema --</option>
          {temasDisponibles.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button onClick={obtenerPreguntas} disabled={loading}>
          {loading ? 'Cargando...' : 'Obtener Preguntas'}
        </button>
      </div>

      {preguntas.map((p) => (
        <div className="pregunta-card" key={p.idx}>
          <div className="pregunta-texto">
            {p.idx + 1}. {p.pregunta}
          </div>
          <ul className="respuestas-lista">
            {p.respuestas.map((op) => {
              const isSelected = p.userAnswer === op;
              let clase = '';
              if (isSelected) {
                clase = op === p.correcta ? 'correcta' : 'incorrecta';
              }
              return (
                <li
                  key={op}
                  className={clase}
                  onClick={() => p.userAnswer === null && handleAnswer(p.idx, op)}
                >
                  {op}
                </li>
              );
            })}
          </ul>
          {p.userAnswer && (
            <p>
              {p.userAnswer === p.correcta
                ? '✅ ¡Correcto!'
                : `❌ Incorrecto. La respuesta correcta es "${p.correcta}".`}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
