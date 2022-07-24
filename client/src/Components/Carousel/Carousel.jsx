import Slider from "react-slick";
import "../../Styles/slick-carousel/slick/slick.css";
import "../../Styles/slick-carousel/slick/slick-theme.css";
import "./_Carousel.scss";
import Card from "../Card/Card";
import { cantidadTarjetas } from "../../auxiliares/Funciones";
import useFetch from "../../Hooks/useFetch";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const Carousel = ({ url, tipo, titulo, clase }) => {
  const { resultados } = useFetch(url);

  const settings = {
    className: "carousel",
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: cantidadTarjetas(),
    slidesToScroll: cantidadTarjetas(),
    autoplay: true,
    autoplaySpeed: 3000,
  };
  console.log(clase);
  return (
    <div className="carousel">
      <div className="contenedor-titulo">
        <h2>{titulo}</h2>
        <Link to={`/home/${clase}`}>
          <AiOutlinePlus className="iconoMas" />
        </Link>
      </div>
      <div className="contenedor-carousel">
        <Slider className="slider" {...settings}>
          {resultados.map((resultado) => (
            <Card
              resultado={resultado}
              clase={clase}
              key={resultado.id}
              id={resultado.id}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
