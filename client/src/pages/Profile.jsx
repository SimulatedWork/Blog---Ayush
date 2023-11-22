import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import "../css/Profile.css";
// import { AiOutlineMail } from "react-icons/ai";
// import { BsInstagram } from "react-icons/bs";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const Profile = () => {
  const activeUser = useSelector((state) => state.user.userInfo);
  const blogs = useSelector((state) => state.blog.blogs);
  const userBlogs = blogs.filter((blog) => {
    return blog.author_id.email == activeUser?.email;
  });
  const isAuthenticated = activeUser !== null;
  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <>
          <div className="userInfo-container">
            <img
              src="/man.png"
              alt="profile-image"
              className="userProfile-image"
            />
            <div className="userInfo">
              <span>Ayush Shrivastav</span>
              <span>ayush41red@gmail.com</span>
            </div>
          </div>
          <div className="blog-grid-container">
            {userBlogs.map((blog) => {
              return <Card key={blog._id} blog={blog} />;
            })}
          </div>
        </>
      ) : (
        <div className="container">Logged Out</div>
      )}
    </>
  );
};

export default Profile;
