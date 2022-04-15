import { useState } from 'react';
import useClima from "../hooks/useClima";

const Formulario = () => {

	const [alerta, setAlerta] = useState("");

	const { busqueda, datosBusqueda } = useClima();
	
	const { ciudad, pais } = busqueda

	const handleSubmit = e => {
		e.preventDefault();
		// Validaciones
		if (Object.values(busqueda).includes("")) {
			setAlerta("Todos los campos son obligatorios");
			return
		}
		setAlerta("");
	}

	return (
		<div className="contenedor">
			{alerta && <p className="alerta">{alerta}</p>}
			<form
				onSubmit={handleSubmit}
			>
				<div className="campo">
					<label htmlFor="ciudad">Ciudad</label>
					<input type="text" name="ciudad" id="ciudad" onChange={e => datosBusqueda(e)} value={ciudad} />
				</div>

				<div className="campo">
					<label htmlFor="pais">País</label>
					<select name="pais" id="pais" onChange={e => datosBusqueda(e)} value={pais}>
						<option value="">Seleccione un País</option>
						<option value="US">Estados Unidos</option>
						<option value="AR">Argentina</option>
						<option value="CO">Colombia</option>
						<option value="CR">Costa Rica</option>
						<option value="ES">España</option>
						<option value="PE">Perú</option>
						<option value="MX">México</option>
						<option value="VE">Venezuela</option>
					</select>
				</div>

				<input type="submit" value="Consultar Clima" />
			</form>
		</div>
	);
};

export default Formulario;
