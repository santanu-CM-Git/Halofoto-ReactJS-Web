import React from "react";
import OwlCarousel from "react-owl-carousel";
import Svg from "../Image/Svg.js";
import { Link } from "react-router-dom";
import Parser from "html-react-parser";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./OurProdutcs.css";
import noImage from "../../Components/Image/noImage.png";

const OurProdutcs = (props) => {
  const { homeProductsTitleData, homeProductData } = props;

  const options = {
    responsiveClass: true,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    autoheight: "true",
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      500: {
        items: 2,
      },
      600: {
        items: 2,
      },
      700: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <>
      {homeProductData && homeProductData?.length > 0 && (
       
        <div className="product__wrap">
          <div className="container-xxl">
            {homeProductsTitleData != undefined && (
              <div className="center__heading__wrapp">
                <h2>{homeProductsTitleData.product_title}</h2>
                {Parser(`${homeProductsTitleData.product_content}`)}
              </div>
            )}
          </div>
          <div className="container-xxl p-0">
            <OwlCarousel {...options}>
              {homeProductData?.length &&
                homeProductData.map(
                  (e) =>
                    e?.id && (
                      <div className="product__card" key={e?.id}>
                        <div className="image__box">
                          <Link to={`/product/${e?.id}`}>
                            {e.product_images &&
                            e.product_images?.length > 0 ? (
                              <img
                                src={e.product_images[0].thumbnail}
                                alt="No Image Available"
                              />
                            ) : (
                              <img src={noImage} alt="No Image Available" />
                            )}
                          </Link>
                        </div>
                        <div className="product__content">
                          <div className="product__name__wrap">
                            <h3>{e.name}</h3>
                            <h4>{e.model_no}</h4>
                          </div>
                          <div className="product__details">
                            {e.additional_info ? (
                              <p>{e.additional_info}</p>
                            ) : null}
                            {e.selling_price ? (
                              <div className="price__meta">
                                <div className="original_price">
                                  Rp: {e.original_price}
                                </div>
                                <div className="selling_price">
                                  Rp: {e.selling_price}
                                </div>
                              </div>
                            ) : (
                              <div className="price__meta">
                                <div className="original_price_single">
                                  Rp {e.original_price}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="btn__wrap">
                            <Link to={`/product/${e.id}`}>
                              Learn More
                              <i className="ico__box">
                                <Svg />
                              </i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                )}
            </OwlCarousel>
          </div>
        </div>
      )}
    </>
  );
};

export default OurProdutcs;
