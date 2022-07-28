import React from 'react'
import Slider from "react-slick"
import "../../Styles/slick-carousel/slick/slick.css";
import "../../Styles/slick-carousel/slick/slick-theme.css";
import "../../Styles/components/_Header.scss";


function ImgHeader() {
    let settings={
        dots:true,
        infinite:true,
        speed:1000,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
        autoplaySpeed: 3000,
    }
    
  return (
    <Slider className="sliderHeader"  {...settings}>
        <div className="wrap">
            <img src="/images/header1.jpg" alt="" />
        </div>
        <div className="wrap">
            <img src="/images/header3.jpg"  alt="" />
        </div>
        <div className="wrap">
            <img src="/images/header4.jpg"  alt="" />
        </div>
        <div className="wrap">
            <img src="/images/header5.jpg"  alt="" />
        </div>
        <div className="wrap">
            <img src="/images/header2.jpg"  alt="" />
        </div>
    </Slider>
  )
}

export default ImgHeader

