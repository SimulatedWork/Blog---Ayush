import "../css/Blog.css";
import { useEffect, useState } from "react";

const Blog = (blog) => {
  // const blog = blog.blog
  const [relativeTime, setRelativeTime] = useState("");
  const categories = blog?.blog?.category?.slice(0, 2);
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
      onClick={() => window.open(`/blog/${blog?.blog?.id}`)}
    >
      <img src={"/profile.svg"} alt="profile" height={120} />
      <p style={{ fontSize: "24px" }}>{blog?.blog?.blog_title}</p>
      <div className="category-container">
        {categories?.map((category) => {
          return (
            <div className="category" key={blog?.blog?.created_at}>
              {category}
            </div>
          );
        })}
      </div>
      <div className="publisherDetails">
        <img
          src={blog?.blog?.profile !== null ? blog?.blog?.profile : "/man.png"}
          alt="profile"
          height={50}
        />
        <div className="publisherName">
          <p>{blog?.blog?.name}</p>
          <span>{relativeTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Blog;
