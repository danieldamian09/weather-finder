import { useState ,createContext } from "react"

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {
  
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  })

  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)
  const [noResultado, setNoResultado] = useState("")
  

  const datosBusqueda = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    })
  }

  const consultarClima = async (datos) => {
    setCargando(true)
    setNoResultado(false)
    try {
      const { ciudad, pais } = datos
      const appID = import.meta.env.VITE_API_KEY
      console.log(appID);
      // URL latitud y longitud
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appID}`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      const { lat, lon } = resultado[0]
    //  URL CLima
      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`
      const respuestaClima = await fetch(urlClima)
      const resultadoClima = await respuestaClima.json()
      setResultado(resultadoClima)
    } catch (error) {
      setNoResultado("No hay resultados")
    }finally{
      setCargando(false)
    }

  }


  return (
    <ClimaContext.Provider value={{
      busqueda,
      datosBusqueda,
      consultarClima,
      resultado,
      cargando,
      noResultado,
    }}>
      {children}
    </ClimaContext.Provider>
  )

}

export { ClimaProvider }

export default ClimaContext;