import { useAuth0 } from "@auth0/auth0-react";
import "../css/Profile.css";
import { AiOutlineMail } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import blogs from "../testing_data/blogs.json";
import Blog from "../Components/Blog";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const user_blogs = blogs.filter((blog) => {
    return blog?.email === user?.email;
  });
  console.log(user);
  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <div className="profileContainer">
          <div className="userDetails">
            <div className="user-image-name">
              <img src={user.picture} alt="user_img" />
              <h1>{user.name}</h1>
            </div>
            <div className="social-info">
              <span>
                <AiOutlineMail />
                {user.email}
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
          <button className="login-button" onClick={() => loginWithRedirect()}>
            Login
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
