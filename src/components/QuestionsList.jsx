import React, { useState } from "react";
import "../styles/questionsList.css";

export default function QuestionsList({ questions, onRestart }) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const q = questions[idx];

  const next = () => {
    setSel(null);
    setIdx(i => i + 1);
  };

  if (idx >= questions.length) {
    return (
      <div className="result">
        <h2>¡Fin del juego!</h2>
        <button onClick={onRestart}>Volver al menú</button>
      </div>
    );
  }

  return (
    <div className="question-card">
      <h3>{q.question}</h3>
      <div className="options">
        {q.options.map((o, i) => (
          <button
            key={i}
            disabled={!!sel}
            className={sel === o ? (o === q.correctAnswer ? "correct" : "wrong") : ""}
            onClick={() => setSel(o)}
          >
            {o}
          </button>
        ))}
      </div>
      {sel && <button onClick={next}>Siguiente</button>}
    </div>
  );
}
