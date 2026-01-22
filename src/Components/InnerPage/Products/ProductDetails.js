import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import starsolid from "../../Image/star-solid.svg";
import starline from "../../Image/star-line.svg";
import starsolidwhite from "../../Image/star-solid-white.svg";
import play from "../../Image/play-ico.svg";
import noImage from "../../Image/noImage.png";
import Svg from "../../Image/Svg.js";
import { Link, useParams } from "react-router-dom";
import { HaloFotoApi } from "../../../Api/api";
import Parser from "html-react-parser";
import moment from "moment/moment";
import "../../Common/css/loader.css";
import HaloStoryVideo from "../../LandingPage/HaloStoryVideo";

const ProductDetails = () => {
  const param = useParams();
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [rating, setRating] = useState(5);
  const [starLineBlankWrap, setStarLineBlankWrap] = useState([]);
  const [starLineFillWrap, setStarLineFillWrap] = useState([]);
  //let starlineBlankWrap = [];

  useEffect(() => {
    window.scrollTo(0, 0)
    HaloFotoApi.getData("product/" + param.id).then((data) => {
      setData(data);
      setTimeout(() => setSpinner(false), 100);
    });
  }, [param.id]);

  useEffect(() => {
    setStarLineFillWrap([]);
    setStarLineBlankWrap([]);

    if (typeof "undefined" !== data?.product?.rating) {
      if (data?.product?.rating > 0) {
        for (let i = 1; i <= 5; i++) {
          if (i <= data?.product?.rating) {
            setStarLineFillWrap((starLineFillWrap) => [
              ...starLineFillWrap,
              <StartRatingFillWrap key={`${i}-fill-counter`} />,
            ]);
          } else {
            setStarLineBlankWrap((starLineBlankWrap) => [
              ...starLineBlankWrap,
              <StartRatingBlankWrap key={`${i}-blank-counter`} />,
            ]);
          }
        }
      } else {
        for (let i = 1; i <= 5; i++) {
          setStarLineBlankWrap((starLineBlankWrap) => [
            ...starLineBlankWrap,
            <StartRatingBlankWrap key={`${i}-blank-counter`} />,
          ]);
        }
      }
    }
  }, [data]);

  return spinner ? (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  ) : (
    <>
      <div className="product__details__main">
        <div className="container">
          {typeof data.product !== undefined && data?.product && (
            <div className="product__single">
              <div className="row">
                <div className="col-xl-5 col-lg-5 order-2 order-xl-1 order-lg-1">
                  <h2>{data.product.name} </h2>
                  <p>
                    {data?.product?.mounts?.length > 0 &&
                      data?.product?.mounts?.map((e) => <>{e?.name},</>)}
                  </p>
                  <div className="review__overview">
                    <ul>
                      {starLineFillWrap}
                      {starLineBlankWrap}
                    </ul>
                    <div className="total__review">
                      {data?.product.rating > 0
                        ? parseFloat(data?.product.rating).toFixed(0)
                        : ""}{" "}
                      <p> (Reviews)</p>
                    </div>
                  </div>
                  <div className="model__number">
                    Model Number : {data?.product?.model_no}
                  </div>
                  <div className="product__type">
                    {data?.product?.product_series?.name}
                  </div>
                  <div className="short__descrapyion">
                    {Parser(`${data?.product?.description}`)}
                  </div>
                  {data?.productCategories !== undefined && (
                    <div className="product__category">
                      Category:
                      {data?.productCategories?.map((e) => (
                        <> {e?.name} </>
                      ))}
                    </div>
                  )}
                  <div className="product__price">
                    {data?.product?.selling_price ? (
                      <div className="price__meta">
                        <div className="original_price">
                          Rp: {data.product.original_price}
                        </div>
                        <div className="selling_price">
                          Rp: {data.product.selling_price}
                        </div>
                      </div>
                    ) : (
                      <div className="price__meta">
                        <div className="original_price_single">
                          Rp {data.product.original_price}
                        </div>
                      </div>
                    )}
                    {/* Price: <span>Rp {data.product.original_price}</span> */}
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 order-xl-2 order-lg-2">
                  {/* <div className="image__box">
                    <img src={singleimg} alt="" />
                  </div> */}
                  <div className="image__box">
                    <Link to={`/product/${data.product.id}`}>
                      {data?.product?.product_images &&
                        data?.product?.product_images?.length > 0 ? (
                        <img
                          src={data?.product?.product_images[0].thumbnail}
                          alt="No Image Available"
                        />
                      ) : (
                        <img src={noImage} alt="No Image Available" />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {data.product !== undefined && data?.product && (
            <div className="technical__information">
              <div className="row">
                <div className="col-xl-7 col-lg-7 col-md-6">
                  <h3>Technical Information</h3>
                  <h4>Specifications</h4>
                  <ul>
                    {data?.product?.model_no !== null && (
                      <li>
                        <label>Model</label>
                        <label>
                          <span>{data.product.model_no}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.focal_length !== null && (
                      <li>
                        <label>Focal Length</label>
                        <label>
                          <span>{data.product.focal_length}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.max_aperture !== null && (
                      <li>
                        <label>Maximum Aperture</label>
                        <label>
                          <span>{data.product.max_aperture}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.angle_of_view !== null && (
                      <li>
                        <label>Angle of View</label>
                        <label>
                          <span>{data.product.angle_of_view}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.optical_construction !== null && (
                      <li>
                        <label>Optical Construction</label>
                        <label>
                          <span>{data.product.optical_construction}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.min_object_distance !== null && (
                      <li>
                        <label>Minimun Object Distance</label>
                        <label>
                          <span>{data.product.min_object_distance}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.max_magnification_ratio !== null && (
                      <li>
                        <label>Maximum Magnification Ratio</label>
                        <label>
                          <span>{data.product.max_magnification_ratio}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.filter_size !== null && (
                      <li>
                        <label>Filter Size</label>
                        <label>
                          <span>{data.product.filter_size}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.max_diameter !== null && (
                      <li>
                        <label>Maximum Diameter</label>
                        <label>
                          <span>{data.product.max_diameter}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.length !== null && (
                      <li>
                        <label>Length</label>
                        <label>
                          <span>{data.product.length}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.weight !== null && (
                      <li>
                        <label>Weight</label>
                        <label>
                          <span>{data.product.weight}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.aperture_blades !== null && (
                      <li>
                        <label>Aperture Blades</label>
                        <label>
                          <span>{data.product.aperture_blades}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.min_aperture !== null && (
                      <li>
                        <label>Minimum Aperture</label>
                        <label>
                          <span>{data.product.min_aperture}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.img_stabilization_performance !== null && (
                      <li>
                        <label>Image Stabilization Performance</label>
                        <label>
                          <span>
                            {data.product.img_stabilization_performance}
                          </span>
                        </label>
                      </li>
                    )}
                    {data?.product?.standard_accessories !== null && (
                      <li>
                        <label>Standard Accessories</label>
                        <label>
                          <span>{data.product.standard_accessories}</span>
                        </label>
                      </li>
                    )}
                    {data?.product?.mounts?.length > 0 &&
                      data?.product?.mounts !== null ? (
                      <li>
                        <label>Compatible Mounts</label>
                        <label>
                          {data?.product?.mounts?.length &&
                            data?.product?.mounts?.map((e) => (
                              <span> {e?.name} </span>
                            ))}
                        </label>
                      </li>
                    ) : (
                      ""
                    )}
                    {data?.product?.camera_types?.length > 0 &&
                      data?.product?.camera_types !== null ? (
                      <li>
                        <label>Camera Type</label>
                        <label>
                          {data?.product?.camera_types?.map((e) => (
                            <span> {e?.name} </span>
                          ))}
                        </label>
                      </li>
                    ) : (
                      ""
                    )}
                    {data?.product?.additional_info?.length > 0 &&
                      data?.product?.additional_info !== null ? (
                      <li>
                        <label>Additional Information</label>
                        <label>
                          <span>
                            {Parser(`${data?.product?.additional_info}`)}
                          </span>
                        </label>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-6">
                  <div className="product__card__video">
                    <div className="image__box">
                      <Link to={`/product/${data.product.id}`}>
                        {data?.product?.product_images &&
                          data?.product?.product_images?.length > 0 ? (
                          <img
                            src={data?.product?.product_images[0].thumbnail}
                            alt="No Image Available"
                          />
                        ) : (
                          <img src={noImage} alt="No Image Available" />
                        )}
                      </Link>
                    </div>

                    {data?.product?.video ? (
                      <div className="video__play__wrapp">
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          <i className="ico__box">
                            <img src={play} alt="" />
                          </i>
                        </a>
                        <HaloStoryVideo videoUrl={data?.product?.video} />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* {data?.similarProducts !== undefined &&
            data?.similarProducts && */}
            {data?.similarProducts?.length ? (
            <div className="innerpage__product__wrap">
              <div className="product__card__wrapp">
                <div className="heading__wrapp">
                  <h2>Similar Products</h2>
                </div>
                <div className="row product__list__row">
                  {typeof data?.similarProducts?.length && data?.similarProducts?.map((e) => (
                    <div
                      className="col-xl-3 col-lg-3 p-0 col-md-4 mr__top"
                      key={e.id}
                    >
                      <div className="product__card">
                        {/* <div className="image__box">
                          <Link to={`/product/${e.id}`}>
                            <img src={lens} alt="" />
                          </Link>
                        </div> */}
                        <div className="image__box">
                          <Link to={`/product/${e.id}`}>
                            {e?.product_images &&
                              e?.product_images?.length > 0 ? (
                              <img
                                src={e?.product_images[0].thumbnail}
                                alt="No Image Available"
                              />
                            ) : (
                              <img src={noImage} alt="No Image Available" />
                            )}
                          </Link>
                        </div>
                        <div className="product__content">
                          <h3>{e.name}</h3>
                          <h4>Model {e.model_no}</h4>
                          <div className="product__details">
                            {e?.compatible_mounts &&
                              typeof null !== e.compatible_mounts &&
                              Parser(`${e.compatible_mounts}`)}
                            {e?.selling_price ? (
                              <div className="price__meta">
                                <div className="original_price">
                                  Rp {e.original_price}
                                </div>
                                <div className="selling_price">
                                  Rp {e.selling_price}
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
           ) : null}
          {data?.productReviews?.length ? (
            <div className="product__reviews">
              <div className="heading__wrapp">
                <h2>Ratings & Reviews</h2>
              </div>
              {typeof data?.productReviews?.length &&
                data?.productReviews?.map((e) => (
                  <div className="review__wrapp" key={e.id}>
                    <div className="review__user">
                      <h3>{e.user.name}</h3>
                      <div className="review__count">
                        {e.rating}
                        <i className="ico__box">
                          <img src={starsolidwhite} alt="" />
                        </i>
                      </div>
                    </div>
                    <div className="review__date">
                      Date:{" "}
                      <span>{moment(e.created_at).format("MMMM DD YYYY")}</span>
                    </div>
                    <div className="review__details">
                      <p>{e.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

const StartRatingBlankWrap = (props) => {
  return (
    <li>
      <i className="ico__box">
        <img src={starline} alt="" />
      </i>
    </li>
  );
};

const StartRatingFillWrap = (props) => {
  return (
    <li>
      <i className="ico__box">
        <img src={starsolid} alt="" />
      </i>
    </li>
  );
};
export default ProductDetails;
