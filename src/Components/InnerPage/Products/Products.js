import React, { useEffect, useState } from "react";
import Banner from "../../Common/Banner/Banner";
import noImage from "../../Image/noImage.png";
import Svg from "../../Image/Svg.js";
import { Link } from "react-router-dom";
import "./Products.css";
import { HaloFotoApi } from "../../../Api/api";
import Parser from "html-react-parser";
import "../../Common/css/loader.css";

const Products = () => {
  const [searchSubmit, setSearchSubmit] = useState(false);
  const [serachValue, setSearchValue] = useState();
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    HaloFotoApi.getData("product-list").then((data) => {
      setData(data);
      setTimeout(() => setSpinner(false), 100);
    });
  }, []);

  useEffect(() => {
    searchSubmit &&
      serachValue.length &&
      HaloFotoApi.getData(`product-list?search=${serachValue}`).then((data) => {
        setSearchSubmit(false);
        setData(data);
        setTimeout(() => setSpinner(false), 100);
      });
  }, [searchSubmit, serachValue]);

  const frmOnSubmit = (e) => {
    e.preventDefault();
    setSearchSubmit(true);
  };

  return spinner ? (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  ) : (
    <>
      <Banner bannerData={data.banner} />
      <div className="innerpage__product__wrap">
        <div className="container">
          <div className="search__wrapp">
            <form onSubmit={frmOnSubmit}>
              <div className="form-group form__group">
                <input
                  type="text"
                  placeholder="Search Product By Keywords..."
                  className="form-control form__control"
                  onKeyUp={(e) => setSearchValue(e.target.value)}
                  required
                />
                <button type="submit" className="search__btn">
                  &nbsp;
                </button>
              </div>
            </form>
          </div>
          {data?.allProducts !== undefined &&
            data?.allProducts.map((e,index) => (
              <div className="product__card__wrapp" key={index}>
                <div className="heading__wrapp">
                  <h2>{e?.category?.name}</h2>
                </div>
                <div className="row product__list__row">
                  {e?.products !== undefined &&
                    e?.products.map(
                      (items,index) => (
                        (
                          <div
                            className="col-xl-3 col-lg-3 p-0 col-md-4 mr__top__medium"
                            key={index}
                          >
                            <div className="product__card">
                              <div className="image__box">
                                <Link to={`/product/${items?.product?.id}`}>
                                  {items?.productImages &&
                                  items?.productImages?.length > 0 ? (
                                    <img
                                      src={items?.productImages[0]?.thumbnail}
                                      alt="No Image Available"
                                    />
                                  ) : (
                                    <img
                                      src={noImage}
                                      alt="No Image Available"
                                    />
                                  )}
                                </Link>
                              </div>

                              <div className="product__content">
                                <h3>{items?.product?.name}</h3>
                                <h4>{items?.product?.model_no}</h4>
                                <div className="product__details">
                                  {items?.compatible_mounts &&
                                    typeof null !== items?.compatible_mounts &&
                                    Parser(`${items?.compatible_mounts}`)}
                                  {items?.product?.selling_price  ? (
                                    <div className="price__meta">
                                      <div className="original_price">
                                        Rp {items?.product?.original_price}
                                      </div>
                                      <div className="selling_price">
                                        Rp {items?.product?.selling_price}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="price__meta">
                                       <div className="original_price_single">
                                        Rp {items?.product?.original_price}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="btn__wrap">
                                  <Link to={`/product/${items?.product?.id}`}>
                                    Learn More
                                    <i className="ico__box">
                                      <Svg />
                                    </i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;
