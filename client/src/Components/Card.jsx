/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../css/Card.css";

const Card = ({ blog }) => {
  const [relativeTime, setRelativeTime] = useState("");
  useEffect(() => {
    const currentTime = new Date().getTime();
    const postTime = new Date(blog?.created_at).getTime();
    const difference = currentTime - postTime;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
      setRelativeTime(`${years} ${years === 1 ? "year" : "years"} ago`);
    } else if (months > 0) {
      setRelativeTime(`${months} ${months === 1 ? "month" : "months"} ago`);
    } else if (days > 0) {
      setRelativeTime(`${days} ${days === 1 ? "day" : "days"} ago`);
    } else if (hours > 0) {
      setRelativeTime(`${hours} ${hours === 1 ? "hr" : "hrs"} ago`);
    } else if (minutes > 0) {
      setRelativeTime(`${minutes} ${minutes === 1 ? "min" : "mins"} ago`);
    } else {
      setRelativeTime(`${seconds} ${seconds === 1 ? "sec" : "secs"} ago`);
    }
  }, [blog]);
  return (
    <div className="blog-card-container">
      <div className="blog-image">
        <img
          src={blog?.cover_image}
          alt="cover-image"
          className="cover-image"
        />
      </div>
      <div className="blogInfo">
        <img
          src={blog?.author_id?.profile}
          alt="profile"
          className="user-profile"
          height={56}
        />
        <p className="authorName">{blog?.author_id?.name}</p>
        <p className="blogTitle">{blog?.title}</p>
        <p className="blogContentDisplay">{relativeTime}</p>
      </div>
      <div className="buttonContainer">
        <span
          onClick={() => {
            const blogData = encodeURIComponent(JSON.stringify(blog));
            window.open(`/blog/${blog?._id}?data=${blogData}`);
          }}
        >
          Read more...
        </span>
      </div>
    </div>
  );
};

export default Card;
