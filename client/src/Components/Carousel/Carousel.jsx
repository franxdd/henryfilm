import React from "react";
import Slider from "react-slick";
import "../../Styles/slick-carousel/slick/slick.css";
import "../../Styles/slick-carousel/slick/slick-theme.css";
import "../../Styles/components/_Carousel.scss";
import Card from "../Card/Card";
import useFetch from "../../auxiliares/useFetch";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const Carousel = ({ url, titulo, clase }) => {
  const { resultados } = useFetch(url);

  const settings = {
    className: "carousel",
    // dots: true,
    infinite: true,
    // speed: 800,
    slidesToShow: 5,
    slidesToScroll: 5,
    // autoplay: true,
    // autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
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
