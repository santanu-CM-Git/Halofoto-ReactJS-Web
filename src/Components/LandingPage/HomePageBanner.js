import React, { useEffect } from "react"
import "./HomePageBanner.css"
import Parser from "html-react-parser"
import BannerGif from "../Image/banner-halofoto 1.gif"

const HomePageBanner = (props) => {
  const homeBannerData = props.homeBannerData

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className="banner__gif__wrapp">
        <div className="container-xxl">
          <img src={BannerGif} />
        </div>
      </div>
      {typeof homeBannerData != "undefined" && homeBannerData?.length > 0 && (
        <div className="header__banner__main">
          {homeBannerData?.map((e) => (
            <div className="banner__content" key={e?.id}>
              <div className="container-xxl">
                <div className="banner__container__inner">
                  <div className="divider__line"></div>
                  <h1>{e?.title}</h1>
                  {Parser(`${e?.description}`)}
                  {/* <div className="lens__info">
                    <ul>
                      <li>
                        <p>Model Name</p>
                        <i className="ico__box">
                          <img src={model} alt="" />
                        </i>
                      </li>
                      <li>
                        <p>Focal Length</p>
                        <i className="ico__box">
                          <img src={focus} alt="" />
                        </i>
                      </li>
                      <li>
                        <p>Maximum Aperture</p>
                        <i className="ico__box">
                          <img src={aperture} alt="" />
                        </i>
                      </li>
                      <li>
                        <p>Length lens</p>
                        <i className="ico__box">
                          <img src={aperture} alt="" />
                        </i>
                      </li>
                    </ul>
                  </div> */}

                  {/* <div className="btn__wrapp">
                    <Link to="/products">
                      Read More
                      <i className="ico__box">
                        <Svg />
                      </i>
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          ))}

          {/* <div
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div>
              <QRCode
                value="http://halofoto.com/download"
                style={{ marginRight: 50 }}
              />
              <p>Download Our App </p>
            </div>
          </div> */}

          {homeBannerData?.length &&
            homeBannerData?.map((e) => (
              <div className="image__box__outer" key={e.id}>
                <div className="image__box">
                  <img src={e?.banner_image} alt="../Image/noImage.png" />
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  )
}

export default HomePageBanner
