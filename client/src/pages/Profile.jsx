import "../css/Profile.css";
import { AiOutlineMail } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import blogs from "../testing_data/blogs.json";
import Blog from "../Components/Blog";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const isAuthenticated = true;
  const user_blogs = blogs.filter((blog) => {
    return blog?.email === "ayush41red@gmail.com";
  });
  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <div className="profileContainer">
          <div className="userDetails">
            <div className="user-image-name">
              <img src={"none.png"} alt="user_img" />
              <h1>{"Ayush Shrivastav"}</h1>
            </div>
            <div className="social-info">
              <span>
                <AiOutlineMail />
                {"ayush41red@gmail.com"}
              </span>
              <span>
                <BsInstagram />
                @ay.ush60_41
              </span>
            </div>
          </div>
          <div className="user-blogs">
            {user_blogs.map((blog_item) => {
              return <Blog key={blog_item.email} blog={blog_item} />;
            })}
          </div>
        </div>
      ) : (
        <div className="container">
          <img src={"/profile.svg"} alt="profile" height={300} />
          <p className="info">You are logged out</p>
          <button className="login-button" onClick={() => alert()}>
            Login
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
