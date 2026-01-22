import React from "react";
import Svg from "../Image/Svg.js";
import calendar from "../Image/calendar-ico.svg";
import comments from "../Image/comments-ico.svg";
import noImage from "../Image/noImage.png";
import { Link } from "react-router-dom";
import "./LatestNews.css";
import Parser from "html-react-parser";
import moment from "moment/moment";

const LatestNews = (props) => {
  const { homenewsData, homeNewsTitleData } = props;

  return (
    <>
      {homenewsData && homenewsData?.length > 0 && (
        <div className="latest__news__main">
          <div className="container-xxl">
            {homeNewsTitleData != undefined && (
              <div className="heading__wrapp__main">
                <div className="heading__wrapp">
                  <h2>{homeNewsTitleData.news_title}</h2>
                  <div className="divider__line">&nbsp;</div>
               {!!homeNewsTitleData.news_content ? <>{Parser(`${homeNewsTitleData.news_content}`)}</> : ''}
                </div>
                <div className="btn__wrap btn__wrap__large__view">
                  <Link to="/news">
                    View all
                    <i className="ico__box">
                      <svg
                        version="1.1"
                        id="Layer_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 309.3 184.5"
                      >
                        <path d="M308.9,95.3c0-0.1,0.1-0.3,0.1-0.4c0.1-0.2,0.1-0.4,0.1-0.6c0-0.1,0-0.2,0.1-0.3c0.1-0.3,0.1-0.6,0.1-0.9l0,0 c0-0.3,0-0.6,0-0.9c0-0.1,0-0.2,0-0.2c0-0.2,0-0.5,0-0.7c0-0.1,0-0.2,0-0.3c0-0.2-0.1-0.5-0.1-0.7s-0.1-0.3-0.1-0.5 s-0.1-0.4-0.1-0.5c-0.1-0.2-0.1-0.4-0.2-0.5c0-0.1-0.1-0.2-0.1-0.2c-0.5-1.4-1.3-2.7-2.4-3.8c-0.1-0.1-0.2-0.2-0.3-0.3L224.6,3.1 c-4.1-4.1-10.8-4.1-14.9,0s-4.1,10.8,0,14.9l63.7,63.7h-263C4.7,81.7,0,86.4,0,92.2c0,5.8,4.7,10.5,10.5,10.5h263l-63.8,63.8 c-4.1,4.1-4.1,10.8,0,14.9c2,2.1,4.7,3.1,7.4,3.1l0,0c2.7,0,5.4-1,7.5-3.1l81.8-81.8l0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.2 c0.3-0.3,0.5-0.6,0.7-0.8c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.2,0.2-0.3,0.3-0.5 c0.1-0.2,0.2-0.5,0.3-0.7l0,0c0.1-0.1,0.1-0.2,0.1-0.4C308.8,95.7,308.9,95.5,308.9,95.3z"></path>
                      </svg>
                    </i>
                  </Link>
                </div>
              </div>
            )}
            <div className="news__wrapp__main">
              <div className="news__items__outer">
                {homenewsData &&
                  homenewsData?.length &&
                  homenewsData.map(
                    (e, index) =>
                      homenewsData.length - 1 > index && (
                        <div className="news__item mr__bottom" key={e.id}>
                          <div className="news__containt">
                            <h3>
                              <Link to={`/news/${e.slug}`}>{e?.name}</Link>
                            </h3>
                            <div className="news__meta">
                              <ul>
                                <li>
                                  <Link to={`/news/${e?.slug}`}>
                                    <i className="ico__box">
                                      <img src={calendar} alt="" />
                                    </i>
                                    <span>
                                      {moment(e?.created_at).format(
                                        "MMMM DD YYYY"
                                      )}
                                    </span>
                                  </Link>
                                </li>
                                {/* <li><a href="/"><i className="ico__box"><img src={comments} alt="" /></i><span>Comments</span></a></li> */}
                              </ul>
                            </div>
                            {e?.short_description?.length && (
                              <>{Parser(`${e?.short_description}`)}</>
                            )}
                            <div className="read__more">
                              <Link to={`/news/${e?.slug}`}>
                                Read More
                                <i className="ico__box">
                                  <Svg />
                                </i>
                              </Link>
                            </div>
                          </div>
                          <div className="image__box">
                            <Link to={`/news/${e?.slug}`}>
                              <img
                                src={`${
                                  (e?.news_image && e?.news_image?.length > 0)
                                    ? e?.news_image
                                    : noImage
                                }`}
                                alt=''
                              />
                            </Link>
                          </div>
                        </div>
                      )
                  )}
              </div>
              {homenewsData?.length &&
                homenewsData.map(
                  (e, index) =>
                    homenewsData.length - 1 === index && (
                      <div
                        className="news__items__outer news__items__outer__sigle mr__bottom"
                        key={e.id}
                      >
                        <div className="news__item news__item__single">
                          <div className="news__containt">
                            <h3>
                              <Link to={`/news/${e?.slug}`}>{e?.name}</Link>
                            </h3>
                            <div className="news__meta">
                              <ul>
                                <li>
                                  <Link to={`/news/${e?.slug}`}>
                                    <i className="ico__box">
                                      <img src={calendar} alt="" />
                                    </i>
                                    <span>
                                      {moment(e?.created_at).format(
                                        "MMMM DD YYYY"
                                      )}
                                    </span>
                                  </Link>
                                </li>
                                {/* <li><Link to={`/news/${e.slug}`}><i className="ico__box"><img src={comments} alt="" /></i><span>Comments</span></Link></li> */}
                              </ul>
                            </div>
                            {e?.short_description?.length && (
                              <>{Parser(`${e?.short_description}`)}</>
                            )}
                            <div className="read__more">
                              <Link to={`/news/${e?.slug}`}>
                                Read More
                                <i className="ico__box">
                                  <Svg />
                                </i>
                              </Link>
                            </div>
                          </div>
                          <div className="image__box">
                            <Link to={`/news/${e?.slug}`}>
                              
                              <img  src={`${
                                  (e?.news_image && e?.news_image?.length > 0)
                                    ? e?.news_image
                                    : noImage
                                }`} alt='' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                )}
            </div>
            <div className="heading__wrapp__main">
              <div className="btn__wrap btn__wrap__small__view">
                <Link to="/news">
                  View all
                  <i className="ico__box">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 309.3 184.5"
                    >
                      <path d="M308.9,95.3c0-0.1,0.1-0.3,0.1-0.4c0.1-0.2,0.1-0.4,0.1-0.6c0-0.1,0-0.2,0.1-0.3c0.1-0.3,0.1-0.6,0.1-0.9l0,0 c0-0.3,0-0.6,0-0.9c0-0.1,0-0.2,0-0.2c0-0.2,0-0.5,0-0.7c0-0.1,0-0.2,0-0.3c0-0.2-0.1-0.5-0.1-0.7s-0.1-0.3-0.1-0.5 s-0.1-0.4-0.1-0.5c-0.1-0.2-0.1-0.4-0.2-0.5c0-0.1-0.1-0.2-0.1-0.2c-0.5-1.4-1.3-2.7-2.4-3.8c-0.1-0.1-0.2-0.2-0.3-0.3L224.6,3.1 c-4.1-4.1-10.8-4.1-14.9,0s-4.1,10.8,0,14.9l63.7,63.7h-263C4.7,81.7,0,86.4,0,92.2c0,5.8,4.7,10.5,10.5,10.5h263l-63.8,63.8 c-4.1,4.1-4.1,10.8,0,14.9c2,2.1,4.7,3.1,7.4,3.1l0,0c2.7,0,5.4-1,7.5-3.1l81.8-81.8l0.1-0.1c0.1-0.1,0.1-0.1,0.1-0.2 c0.3-0.3,0.5-0.6,0.7-0.8c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.2,0.2-0.3,0.3-0.5c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.2,0.2-0.3,0.3-0.5 c0.1-0.2,0.2-0.5,0.3-0.7l0,0c0.1-0.1,0.1-0.2,0.1-0.4C308.8,95.7,308.9,95.5,308.9,95.3z"></path>
                    </svg>
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default LatestNews;
