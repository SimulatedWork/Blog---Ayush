import "../css/BlogInfo.css";
import { useEffect, useState } from "react";
const BlogInfo = () => {
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    const encodedData = new URLSearchParams(window.location.search).get("data");
    if (encodedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        setBlogData(decodedData);
      } catch (e) {
        console.log("Error decoding blog data: ", e);
      }
    }
  }, []);

  if (!blogData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-info-container">
      <div>
        <h1>{blogData && blogData.title}</h1>
        <img
          src={blogData && blogData.cover_image}
          alt="profile"
          height={150}
        />
      </div>
      <div>
        <p>{blogData && blogData.content}</p>
      </div>
    </div>
  );
};

export default BlogInfo;
