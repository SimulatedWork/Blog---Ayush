import { useDispatch, useSelector } from "react-redux";
import Blog from "../Components/Blog";
import Navbar from "../Components/Navbar";
import "../css/Blogs.css";
import { useEffect } from "react";
import { fetchBlog } from "../reducers/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  useEffect(() => {
    if (!blogs.length) {
      dispatch(fetchBlog());
    }
  }, [blogs, dispatch]);
  return (
    <>
      <Navbar />
      <div className="blog-head-container">
        {blogs &&
          !blogs.error &&
          blogs.map((blog_item) => {
            return <Blog blog={blog_item} key={blog_item._id} />;
          })}
      </div>
    </>
  );
};

export default Blogs;
