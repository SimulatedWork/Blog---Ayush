import { useLocation } from "react-router-dom";
import "../css/BlogInfo.css";
import blogs from "../testing_data/blogs.json";
const BlogInfo = () => {
  const location = useLocation();
  var path = location.pathname.split("/")[2] - 1;
  if (path > blogs.length) {
    window.close();
  }
  return (
    <div className="blog-info-container">
      <div>
        <h1>{blogs[path].blog_title}</h1>
        <img src={"/profile.svg"} alt="profile" height={250} />
      </div>
      <div>
        <p>{blogs[path].blog_content}</p>
      </div>
    </div>
  );
};

export default BlogInfo;
