import React from 'react'
import Slider from "react-slick"
import "../../Styles/slick-carousel/slick/slick.css";
import "../../Styles/slick-carousel/slick/slick-theme.css";
import "../../Styles/components/_Header.scss";
import header1 from "../../img/header1.jpg";
import header2 from "../../img/header2.jpg";
import header3 from "../../img/header3.jpg";
import header4 from "../../img/header4.jpg";
import header5 from "../../img/header5.jpg"


const imgs = [
    header1,
    header2,
    header3,
    header4,
    header5,
];
function ImgHeader() {
    let settings={
        dots:true,
        infinite:true,
        speed:1000,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
        autoplaySpeed: 3000,
    };
    const renderSlides = imgs.map((num) => (
        <img className="trending-img" key={num} src={num} alt="" />
      ));
    
  return (
    <div className="sliderHeader">
    <section className="wrap">
      <div>
        <Slider {...settings}>{renderSlides}</Slider>
      </div>
    </section>
  </div>
    // <Slider className="sliderHeader"  {...settings}>
    //     <div className="wrap ">
    //         <img src={header1} alt="" />
    //     </div>
    //     <div className="wrap">
    //         <img src={header3} alt="" />
    //     </div>
    //     <div className="wrap">
    //         <img src={header4} alt="" />
    //     </div>
    //     <div className="wrap">
    //         <img src={header5} alt="" />
    //     </div>
    //     <div className="wrap">
    //         <img src={header2} alt="" />
    //     </div>
    // </Slider>
  )
}

export default ImgHeader

