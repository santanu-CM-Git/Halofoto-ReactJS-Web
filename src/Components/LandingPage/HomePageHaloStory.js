import React, { useEffect, useState } from "react"
import Svg from "../Image/Svg.js"
import { Link } from "react-router-dom"
import play from "../Image/play-ico.svg"
import "./HomePageHaloStory.css"
import Parser from "html-react-parser"
import "../Common/css/loader.css"
import HaloStoryVideo from "./HaloStoryVideo.js"
import videoBg from "../Image/halostory2.png"

const HomePageHaloStory = (props) => {
  const { homeStoryData, homeStoryTitleData } = props
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    setTimeout(() => setSpinner(false), 1000)
  }, [])


  return (
    <>
      {homeStoryData && homeStoryData?.length != 0 ? (
        <div className="halo__story__main">
          <div className="container-xxl">
            {homeStoryTitleData != null && (
              <div className="center__heading__wrapp">
                <div className="center__heading__wrapp__inner">
                  <h2>{homeStoryTitleData?.story_title}</h2>
                  <div className="divider__line"></div>
                  {Parser(`${homeStoryTitleData?.story_content}`)}
                </div>
                <div className="btn__wrap btn__wrap__large__view">
                  <Link to="/story">
                    View all
                    <i className="ico__box">
                      <Svg />
                    </i>
                  </Link>
                </div>
              </div>
            )}
            <div className="halo__story__card__wrap">
              <div className="row">
                {homeStoryData?.length &&
                  homeStoryData.map(
                    (e) =>
                      e?.id && (
                        <div
                          className="col-xl-4 col-lg-4 col-md-4 mr__bottom"
                          key={e.id}
                        >
                          <div className="story__card__wrapp">
                            <div className="story__card">
                              {e?.video_podcast?.length &&
                                e?.story_image?.length ? (

                                  <div className="image__box">
                                    <Link to={`/story/${e.slug}`}>
                                    <img src={`${e?.story_image}`} alt="../" />
                                    </Link>
                                    {e?.video_podcast == undefined ? (
                                      <div className="video__play__wrapp">
                                        <div className="image__box">
                                          <img src={`${e?.story_image}`} alt="" />
                                        </div>
                                        <a
                                          data-bs-toggle="modal"
                                          data-bs-target={`#staticBackdrop${e?.id}`}
                                        >
                                          <i className="ico__box">
                                            <img src={play} alt="" />
                                          </i>
                                        </a>
                                        <HaloStoryVideo
                                          videoUrl={`${e?.video_podcast}`}
                                          modalId={e?.id}
                                        />
                                      </div>
                                    ) : (
                                      <Link to={`/story/${e.slug}`}>
                                        <div className="image__box">
                                          <img src={`${e?.story_image}`} alt="" />
                                        </div>
                                      </Link>
                                    )}
                                  </div>
                              ) : (
                                <Link to={`/story/${e.slug}`}>
                                  <div className="story__content">
                                    {e?.name && <h3>{e?.name}</h3>}
                                    {e?.short_description &&
                                      Parser(`${e?.short_description}`)}
                                    {e?.short_description &&
                                      Parser(`${e?.short_description}`)}
                                  </div>
                                </Link>
                              )}
                            </div>
                            <div className="story__profile">
                              {e?.story_image?.length ? (
                                <>
                                  <Link to={`/story/${e.slug}`}>
                                    <div className="image__box">
                                      <img src={`${e?.story_image}`} alt="" />
                                    </div>
                                    <div className="profile__title">
                                      {e?.name}
                                    </div>
                                  </Link>
                                </>
                              ) : (
                                <Link to={`/story/${e.slug}`}>
                                  <div className="profile__title">
                                    {e?.name}
                                  </div>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                  )}
              </div>
            </div>
            <div className="btn__wrap btn__wrap__small__view">
              <Link to="/story">
                View all
                <i className="ico__box">
                  <Svg />
                </i>
              </Link>
            </div>
          </div>
        </div>
      )
        : ''
      }
    </>
  )
}

export default HomePageHaloStory
