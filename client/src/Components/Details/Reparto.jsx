import { useParams } from "react-router-dom";
import Card from "../Card/Card";
// import "../styles/components/_Resultados.scss";
import useFetch from "../../auxiliares/useFetch";
import { urlBase, apiKey } from "../../auxiliares/Variables.js";


const Reparto = () => {
  const params = useParams();

  const { cast } = useFetch(
    `${urlBase}/${params.tipo}/${params.id}/credits?api_key=${apiKey}&language=es-SP&page=1`
  );

  return (
    <>
    
      <div className="contenedor-seccion">
        <section>
          <div className="contenedor-resultados">
            {cast.length === 0 && (
              <h3 className="no-disponible">
              noDisponible
              </h3>
            )}
            {cast.map((resultado) => (
              <Card resultado={resultado} tipo="person" key={resultado.id} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Reparto;
