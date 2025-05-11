import React, { useState } from 'react'

const Pregunta = () => {
  const [respuesta, setRespuesta] = useState(null)

  const opciones = ['A', 'B', 'C', 'D']
  const correcta = 'B'

  const verificar = (opcion) => {
    setRespuesta(opcion === correcta ? '¡Correcto!' : 'Incorrecto')
  }

  return (
    <div>
      <p>¿Cuál es la capital de Francia?</p>
      {opciones.map((op, i) => (
        <button key={i} onClick={() => verificar(op)}>{op}</button>
      ))}
      {respuesta && <p>{respuesta}</p>}
    </div>
  )
}

export default Pregunta
