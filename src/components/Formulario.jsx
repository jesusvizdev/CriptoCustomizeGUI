import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";
import { useEffect, useState, useSyncExternalStore } from "react";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-top: 30px;

  &:hover {
    cursor: pointer;
    background-color: #7a70fe;
  }
`;

const Error = styled.p`
  background-color: #fff;
  color: #db4242;
  padding: 5px;
  text-align: center;
  font-weight: 700;
`;

export default function Formulario({ setMonedas, setCotizacion }) {
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);
  const [criptos, setCriptos] = useState([]);
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
    "Elige tu criptomoneda",
    criptos
  );

  const [error, setError] = useState(false);
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });
      setCriptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([moneda, criptomoneda].includes("")) {
      setError(true);
      setCotizacion({});
      return;
    }
    setError(false);
    setMonedas({
      moneda,
      criptomoneda,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectMonedas />
      <SelectCriptomoneda />
      <InputSubmit type="submit" value="Cotizar" />
      {error && <Error>Todos los campos son obligatorios</Error>}
    </form>
  );
}
