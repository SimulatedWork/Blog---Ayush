import "../css/Blog.css";
import { useEffect, useState } from "react";

const Blog = (blog) => {
  const [relativeTime, setRelativeTime] = useState("");
  useEffect(() => {
    const currentTime = new Date().getTime();
    const postTime = new Date(blog?.blog?.created_at).getTime();
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
  }, [blog?.blog?.created_at]);

  return (
    <div
      className="blog-container"
      title={blog?.blog?.blog_title}
      onClick={() => {
        const blogData = encodeURIComponent(JSON.stringify(blog?.blog));
        window.open(`/blog/${blog?.blog?._id}?data=${blogData}`);
      }}
    >
      <img src={blog?.blog?.cover_image} alt="profile" height={100}/>
      <p style={{ fontSize: "20px", padding: "10px" }}>{blog?.blog?.title}</p>
      <div className="publisherDetails">
        <img src={blog?.blog?.author_id?.profile} alt="profile" height={50} />
        <div className="publisherName">
          <p>{blog?.blog?.author_id?.name}</p>
          <span>{relativeTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Blog;
