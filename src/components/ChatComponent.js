// frontend/src/components/ChatComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  // Función para manejar el envío del mensaje
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/generate', {
        prompt: inputText, // Enviamos el prompt al backend
      });

      setResponseText(response.data.answer); // Asumimos que el backend devuelve un campo `answer`
    } catch (error) {
      console.error('Error al generar el texto:', error);
    }
  };

  return (
    <div>
      <h1>ChatGPT Integration</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>

      <div>
        <h2>Respuesta de ChatGPT:</h2>
        <p>{responseText}</p>
      </div>
    </div>
  );
};

export default ChatComponent;
