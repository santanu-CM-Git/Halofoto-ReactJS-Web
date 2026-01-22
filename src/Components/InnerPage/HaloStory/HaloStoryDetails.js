import React, { useEffect, useState } from "react";
import card_photo from "../../Image/story-photo.png";
import audio from "../../Image/audio.svg";
import video from "../../Image/video.svg";
import Banner from "../../Common/Banner/Banner";
import "./HaloStoryDetails.css";
import { Link, useParams } from "react-router-dom";
import { HaloFotoApi } from "../../../Api/api";
import Parser from "html-react-parser";
import "../../Common/css/loader.css";
import HaloStoryVideo from "../../LandingPage/HaloStoryVideo";
import HaloStoryAudio from "../../LandingPage/HaloStoryAudio";

const HaloStoryDetails = (props) => {
  const param = useParams();
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    HaloFotoApi.getData("story/" + param.slug).then((data) => {
      setData(data);
      setTimeout(() => setSpinner(false), 100);
    });
  }, [param.slug]);

  return spinner ? (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  ) : (
    <>
      <Banner bannerData={data.banner} />
      <div className="story__details__main">
        <div className="container">
          <div className="row">
            {data?.story && (
              <div className="story__details">
                <div className="image__box">
                  <img src={data?.story?.story_image} alt="" />
                </div>
                <div className="story__details__content">
                  <h3>{data.story.name}</h3>
                  {Parser(`${data.story.description}`)}
                  <div className="story__media">
                    {data?.story?.audio_podcast &&
                      data?.story?.audio_podcast?.length > 0 && (
                        <div className="media__card media__audio">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target={`#staticAudioBackdrop${data?.story?.id}`}
                          >
                             <img src={audio} alt="" />
                          </a>
                          <HaloStoryAudio
                            audioUrl={`${data?.story?.audio_podcast}`}
                            modalId={data?.story?.id}
                          />
                        </div>
                        
                      )}
                    {data?.story?.video_podcast &&
                      data?.story?.video_podcast?.length > 0 && (
                        <div className="media__card media__video">
                          <div className="video__play__wrapp">
                            {/* href={`${STORAGE_BASE_URL}/storage/halo_story/${e.video_podcast}` */}
                            <a
                              data-bs-toggle="modal"
                              data-bs-target={`#staticBackdrop${data?.story?.id}`}
                            >
                              <img src={video} alt="" />
                            </a>
                            <HaloStoryVideo
                              videoUrl={`${data?.story?.video_podcast}`}
                              modalId={data?.story?.id}
                            />
                          </div>
                          <Link to=""></Link>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HaloStoryDetails;
