import { useRef } from "react";
import "./HaloStoryVideo.css";

const HaloStoryVideo = ({ videoUrl, modalId }) => {

  //const { videoUrl } = props;
  const videoRef = useRef(null);
  const onClose = () => {
    videoRef.current.pause();
  };

  return (
    <div
      className="modal modal__main fade"
      id={`staticBackdrop${modalId}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal__dialog">
        <div className="modal-content modal__content">
          <button
            type="button"
            className="btn-close btn__close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => onClose()}
          ></button>
          <div className="modal-body modal__body">
            <video width="100%" height="100%" controls ref={videoRef}>
              <source src={videoUrl} type="video/mp4"></source>
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaloStoryVideo;
