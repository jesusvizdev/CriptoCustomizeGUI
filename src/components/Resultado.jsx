import styled from "@emotion/styled";

const Result = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;
const Precio = styled.p`
  font-size: 24px;
  & span {
    font-weight: 700;
  }
`;
const Texto = styled.p`
  font-size: 18px;
  & span {
    font-weight: 700;
  }
`;

const Imagen = styled.img`
  display: block;
  width: 120px;
`;

export default function Resultado({ cotizacion, cargando }) {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    cotizacion;
  return (
    <Result>
      <Imagen
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt="imagen-cripto"
      />
      <div>
        <Precio>
          El precio es de: <span>{PRICE}</span>
        </Precio>
        <Texto>
          Precio más alto del día: <span>{HIGHDAY}</span>
        </Texto>
        <Texto>
          Precio más bajo del día: <span>{LOWDAY}</span>
        </Texto>
        <Texto>
          Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
        </Texto>
        <Texto>
          Ultima actualización: <span>{LASTUPDATE}</span>
        </Texto>
      </div>
    </Result>
  );
}
