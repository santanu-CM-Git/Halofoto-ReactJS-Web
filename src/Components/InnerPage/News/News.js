import React, { useEffect, useState } from "react";
import Banner from "../../Common/Banner/Banner";
import Svg from "../../Image/Svg";
import calendar from "../../Image/calendar-ico.svg";
import comments from "../../Image/comments-ico.svg";
import { Link, useParams } from "react-router-dom";
import "./News.css";
import NewsSideBar from "./NewsSideBar";
import { HaloFotoApi } from "../../../Api/api";
import moment from "moment/moment";
import Parser from "html-react-parser";
import Pagination from "../../Common/Pagination/Pagination";
import "../../Common/css/loader.css";

const News = () => {
  const param = useParams();
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([])
  const [searchSubmit, setSearchSubmit] = useState(false);
  const [serachValue, setSearchValue] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    searchSubmit &&
      serachValue.length &&
      HaloFotoApi.getData(`news?search=${serachValue}&page=${currentPage}`).then((data) => {
        setSearchSubmit(true)
        setSearchedData(data)
        setTimeout(() => setSpinner(false), 100)
      });
  }, [searchSubmit, serachValue, currentPage]);

  useEffect(() => {
    HaloFotoApi.getData(
      typeof param.slug != "undefined"
        ? `category/news/${param?.slug}?page=${currentPage}`
        : `news?page=${currentPage}`
    ).then((data) => {
      setData(data);
      setTimeout(() => setSpinner(false), 100);
    });
  }, [param.slug, currentPage]);


  return spinner ? (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  ) : (
    <>
      <Banner bannerData={data.banner} />
      <div className="latest__news__list">
        <div className="container">
          <div className="row">
            {!!searchedData?.newslists?.data ?
              <>
                {searchedData?.newslists?.data && searchedData?.newslists?.data?.length > 0 ? (
                  <div className="col-xl-8 col-lg-8 col-md-7">
                    {searchedData?.newslists?.data?.map((e, index) => (
                      <>
                        <div className="news__items__outer">
                          <div className="news__item mr__top" key={index}>
                            {e?.news_image && e?.news_image?.length > 0 ? (
                              <div className="image__box">
                                <Link to={`/news/${e?.slug}`}>
                                  <img
                                    src={`${e?.news_image}`} alt="" />
                                </Link>
                              </div>
                            ) : (
                              ``
                            )}
                            <div className="news__containt">
                              <h3>
                                <Link to={`/news/${e?.slug}`}>{e?.name}</Link>
                              </h3>
                              <div className="news__meta">
                                <ul>
                                  <li>
                                    <Link to={`/news/${e.slug}`}>
                                      <i className="ico__box">
                                        <img src={calendar} alt="" />
                                      </i>
                                      <span>
                                        {moment(e.created_at).format(
                                          "MMMM DD YYYY"
                                        )}
                                      </span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              {e?.short_description &&
                                Parser(`${e?.short_description}`)}
                              <div className="read__more">
                                <Link to={`/news/${e.slug}`}>
                                  Read More
                                  <i className="ico__box">
                                    <Svg />
                                  </i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                    {typeof searchedData?.newslists?.links != "undefined" &&
                      searchedData.newslists.links.length && (
                        <div className="blog__details__navigation">
                          <Pagination
                            className="blog__single__navigation"
                            currentPage={searchedData?.newslists?.current_page}
                            totalCount={searchedData?.newslists?.total}
                            pageSize={searchedData?.newslists?.per_page}
                            onPageChange={page => setCurrentPage(page)}
                            lastPage={searchedData?.newslists?.last_page}
                          />
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="col-xl-8 col-lg-8 col-md-7">
                    <h2>No content matched</h2></div>
                )}
              </>
              :
              <>
                {data?.newslists?.data && data?.newslists?.data?.length > 0 ? (
                  <div className="col-xl-8 col-lg-8 col-md-7">
                    {data.newslists.data.map((e, index) => (
                      <>
                        <div className="news__items__outer">
                          <div className="news__item mr__top" key={index}>
                            {e?.news_image && e?.news_image?.length > 0 ? (
                              <div className="image__box">
                                <Link to={`/news/${e?.slug}`}>
                                  <img
                                    src={`${e?.news_image}`} alt="" />
                                </Link>
                              </div>
                            ) : (
                              ``
                            )}
                            <div className="news__containt">
                              <h3>
                                <Link to={`/news/${e?.slug}`}>{e?.name}</Link>
                              </h3>
                              <div className="news__meta">
                                <ul>
                                  <li>
                                    <Link to={`/news/${e.slug}`}>
                                      <i className="ico__box">
                                        <img src={calendar} alt="" />
                                      </i>
                                      <span>
                                        {moment(e.created_at).format(
                                          "MMMM DD YYYY"
                                        )}
                                      </span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              {e?.short_description &&
                                Parser(`${e?.short_description}`)}
                              <div className="read__more">
                                <Link to={`/news/${e.slug}`}>
                                  Read More
                                  <i className="ico__box">
                                    <Svg />
                                  </i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                    {typeof data?.newslists?.links != "undefined" &&
                      data.newslists.links.length && (
                        <div className="blog__details__navigation">
                          <Pagination
                            className="blog__single__navigation"
                            currentPage={data?.newslists?.current_page}
                            totalCount={data?.newslists?.total}
                            pageSize={data?.newslists?.per_page}
                            onPageChange={page => setCurrentPage(page)}
                            lastPage={data?.newslists?.last_page}
                          />
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="col-xl-8 col-lg-8 col-md-7">
                    <h2>No content matched</h2></div>
                )}
              </>
            }
            <div className="col-xl-4 col-lg-4 col-md-5">
              <NewsSideBar
                recentPosts={data.recentPosts}
                allCategories={data.allCategories}
                setSearchSubmit={setSearchSubmit}
                setSearchValue={setSearchValue}
                showSearchBar={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default News;
