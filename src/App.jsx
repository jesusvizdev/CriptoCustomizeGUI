import styled from "@emotion/styled";
import ImgCripto from "./img/imagen-criptos.png";
import Formulario from "./components/Formulario";
import { useState, useEffect } from "react";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

//Styled Components

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0px auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;
const Header = styled.h1`
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

export default function App() {
  const [monedas, setMonedas] = useState({});
  const [cotizacion, setCotizacion] = useState({});
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const { moneda, criptomoneda } = monedas;

      const cotizarCripto = async () => {
        setCargando(true);
        setCotizacion({});
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        console.log(url);
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado.DISPLAY[criptomoneda][moneda]);
        setCotizacion(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      };
      cotizarCripto();
    }
  }, [monedas]);
  return (
    <Contenedor>
      <Imagen src={ImgCripto} alt="imagen-cripto" />
      <div>
        <Header>Cotiza Criptomonedas al instante</Header>
        <Formulario setMonedas={setMonedas} setCotizacion={setCotizacion} />
        {cargando && <Spinner />}
        {cotizacion.PRICE && (
          <Resultado cotizacion={cotizacion} cargando={cargando} />
        )}
      </div>
    </Contenedor>
  );
}
