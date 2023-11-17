import { useDispatch, useSelector } from "react-redux";
import "../css/Blogs.css";
import Card from "../Components/Card";
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
      <div className="blog-head-container">
        {blogs &&
          !blogs.error &&
          blogs.map((blog_item) => {
            return <Card blog={blog_item} key={blog_item?._id} />;
          })}
      </div>
    </>
  );
};

export default Blogs;
