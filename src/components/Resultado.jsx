import useClima from "../hooks/useClima";

const Resultado = () => {
  const { resultado } = useClima();
  const { name, main, weather } = resultado;
	return (
		<div className="contenedor">
			<h2>El clima de {name} es:</h2>
		</div>
	);
};

export default Resultado;
