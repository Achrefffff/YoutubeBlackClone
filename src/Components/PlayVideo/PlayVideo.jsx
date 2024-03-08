import React, { useEffect } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { useParams } from "react-router";
import { useState } from "react";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const PlayVideo = () => {
  
  const {videoId} = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApiData(data.items[0]);
      });
  };
  const fetchOtherData = async () => {
    if (apiData && apiData.snippet && apiData.snippet.channelId) {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      await fetch(channelData_url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setChannelData(data.items[0]);
        });

      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;

      await fetch(comment_url)
        .then((res) => res.json())
        .then((data) => {
          setCommentData(data.items);
        });
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/*<video src={video1} controls autoPlay muted></video>*/}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay;"
        allowFullScreen
        muted={false}
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "title here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData && apiData.statistics && apiData.statistics.viewCount
            ? value_converter(apiData.statistics.viewCount)
            : "16k"}{" "}
          views &bull;{" "}
          {apiData && apiData.snippet && apiData.snippet.publishedAt
            ? moment(apiData.snippet.publishedAt).fromNow()
            : "2 days ago"}
        </p>

        <div>
          <span>
            <img src={like} alt="" />{" "}
            {apiData ? value_converter(apiData.statistics.likeCount) : 155}
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
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {" "}
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "69"}{" "}
            Subscriber
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 550)
            : "7out houni description"}{" "}
        </p>
        <hr />
        <h4>
          {" "}
          {apiData
            ? value_converter(apiData.statistics.commentCount)
            : 169}{" "}
          Comments
        </h4>

        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                  <span>2 days ago</span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                  <span>1</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
