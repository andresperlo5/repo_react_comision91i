import { useState } from "react";

const Contador = ({ numero = 20 }) => {
  const [estado, setEstado] = useState(numero);

  const sumar = () => {
    setEstado(estado + 1);
  };

  const restar = () => {
    setEstado(estado - 1);
  };

  return (
    <div className="d-flex">
      <button onClick={sumar}>+</button>
      <span>{estado}</span>
      <button onClick={restar}>-</button>
    </div>
  );
};

export default Contador;
