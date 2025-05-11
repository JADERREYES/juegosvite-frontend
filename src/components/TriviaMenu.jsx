import React from "react";
import axios from "axios";
import "../styles/triviaMenu.css";

const categories = [
  "Cine y Series",
  "Juegos y Comida",
  "Deportes",
  "Redes y Tecnología",
  "Viajes y Lugares",
];

export default function TriviaMenu({ onSelect }) {
  const select = async (cat) => {
    const res = await axios.post("http://localhost:5000/api/generate", { category: cat });
    onSelect(res.data);
  };

  return (
    <div className="trivia-menu">
      {categories.map(cat => (
        <div key={cat} className="category" onClick={() => select(cat)}>
          {cat}
        </div>
      ))}
      <div className="footer">Desarrollado por JFREYES</div>
    </div>
  );
}
