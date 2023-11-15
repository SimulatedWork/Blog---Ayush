import Blog from "../Components/Blog";
import Navbar from "../Components/Navbar";
import "../css/Blogs.css";
import { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/blogs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="blog-head-container">
        {blogs && !blogs.error && blogs.map((blog_item) => {
          return <Blog blog={blog_item} key={blog_item._id} />;
        })}
      </div>
    </>
  );
};

export default Blogs;
