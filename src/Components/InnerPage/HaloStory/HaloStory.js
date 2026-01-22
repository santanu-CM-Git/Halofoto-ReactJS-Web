import React, { useEffect, useState } from "react";
import { HaloFotoApi } from "../../../Api/api";
import Banner from "../../Common/Banner/Banner";
import card_photo from "../../Image/story-photo.png";
import Svg from "../../Image/Svg.js";
import { Link } from "react-router-dom";
import "./HaloStory.css";
import Parser from "html-react-parser";
import "../../Common/css/loader.css";

const HaloStory = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    HaloFotoApi.getData("story").then((data) => {
      setData(data);
      setTimeout(() => setSpinner(false), 100);
    });
  }, []);

  return spinner ? (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  ) : (
    <>
      <Banner bannerData={data.banner} />
      <div className="halo__story__list">
        <div className="container">
          <div className="row">
            {typeof data.story?.data != undefined &&
              data.story?.data.length &&
              data.story?.data.map((e) => (
                <div
                  className="col-xl-4 col-lg-4 col-md-6 mr__bottom"
                  key={e.id}
                >
                  <div className="story__card">
                    <div className="image__box">
                      {e.story_image != null && (
                        <img src={e.story_image} alt="" />
                      )}
                    </div>

                    {e?.short_description ? (
                      <div className="story__wrap">
                        <h3>{e.name}</h3>
                        {Parser(`${e.short_description}`)}
                        <div className="btn__wrapp">
                          <Link to={e?.slug}>
                            Read More
                            <i className="ico__box">
                              <Svg />
                            </i>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="story__wrap">
                        <h3>{e.name}</h3>
                        <div className="btn__wrapp">
                          <Link to={e?.slug}>
                            Read More
                            <i className="ico__box">
                              <Svg />
                            </i>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HaloStory;
