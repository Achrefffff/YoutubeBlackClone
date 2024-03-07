import React from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";

const PlayVideo = ({videoId}) => {
  return (
    <div className="play-video">
      {/*<video src={video1} controls autoPlay muted></video>*/}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay;"
        allowfullscreen
        muted={false}
      ></iframe>
      <h3>Lorem ipsum dolore asba</h3>
      <div className="play-video-info">
        <p>1525 views &bull; 2 days ago</p>
        <div>
          <span>
            <img src={like} alt="" /> 125
          </span>
          <span>
            <img src={dislike} alt="" /> 2
          </span>
          <span>
            <img src={share} alt="" /> Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt="" />
        <div>
          <p>Achref Channel</p>
          <span> 1M Subscriber</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>blabla lorem impsm doless klamnki</p>
        <p>
          {" "}
          labla lorem impsm doless klamnk blabla lorem impsm doless klamnki
        </p>
        <hr />
        <h4>169 Comments</h4>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Ach Ch <span>2 days ago</span>
            </h3>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. In hac habitasse platea
              dictumst
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>269</span>
              <img src={dislike} alt="" />
              <span>1</span>
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Ach Ch <span>2 days ago</span>
            </h3>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. In hac habitasse platea
              dictumst
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>269</span>
              <img src={dislike} alt="" />
              <span>1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
