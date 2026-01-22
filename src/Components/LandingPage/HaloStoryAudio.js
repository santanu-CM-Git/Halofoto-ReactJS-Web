import { useRef } from "react";
import "./HaloStoryVideo.css";

const HaloStoryAudio = ({ audioUrl, modalId }) => {

  //const { videoUrl } = props;
  const audioRef = useRef();
  const onClose = () => {
    // audioRef.pause()
    // audioRef.current.pause();
  };

  return (
    <div
      className="modal modal__main fade"
      id={`staticAudioBackdrop${modalId}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticAudioBackdropLabel"
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
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" ref={audioRef}></source>
            </audio> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaloStoryAudio;
