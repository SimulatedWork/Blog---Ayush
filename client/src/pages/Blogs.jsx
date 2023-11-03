import Blog from "../Components/Blog";
import blogs from "../testing_data/blogs.json";
import Navbar from "../Components/Navbar";
import "../css/Blogs.css";

const Blogs = () => {
  return (
    <>
      <Navbar />
      <div className="blog-head-container">
        {blogs.map((blog_item) => {
          return <Blog blog={blog_item} key={blog_item.email} />;
        })}
      </div>
    </>
  );
};

export default Blogs;
