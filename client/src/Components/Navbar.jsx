import { useState } from "react";
import "../css/Navbar.css";
import { RotatingLines } from "react-loader-spinner";
import Blogs from "../pages/Blogs";
import About from "../pages/About";
import UploadBlog from "../pages/UploadBlog";
import Profile from "../pages/Profile";

const Navbar = () => {
  const [loginState, setLoginState] = useState(false);
  const [activeComponent, setActiveComponent] = useState(<Blogs />);
  const handleElementChange = (e, componentName) => {
    const navComponents = document.querySelectorAll(".nav-comp");
    navComponents.forEach((el) => {
      el.classList.remove("active-space");
    });
    console.log(componentName);
    switch (componentName) {
      case "blogs":
        setActiveComponent(<Blogs />);
        break;
      case "about":
        setActiveComponent(<About />);
        break;
      case "profile":
        setActiveComponent(<Profile />);
        break;
      case "post":
        setActiveComponent(<UploadBlog />);
        break;
      default:
        break;
    }
    e.target.classList.add("active-space");
  };
  const handleLoginButtonClick = () => {
    setLoginState(true);
    setTimeout(() => {
      setLoginState(false);
    }, 3000)
  };
  return (
    <>
      <div className="navbar">
        <span>Bloggery</span>
        <span className="search-container">
          <input
            type="text"
            name="search"
            className="search-bar"
            placeholder="Search for title, category..."
          />
          <button className="icon button">
            <img src="/search.svg" alt="search" height={24} />
          </button>
        </span>

        <nav>
          <span
            className="active-space nav-comp"
            onClick={(e) => handleElementChange(e, "blogs")}
          >
            Blogs
          </span>
          <span
            className="nav-comp"
            name="about"
            onClick={(e) => handleElementChange(e, "about")}
          >
            About?
          </span>
          <span
            name="profile"
            className="nav-comp"
            onClick={(e) => handleElementChange(e, "profile")}
          >
            Profile
          </span>
          <span
            name="post-blog"
            className="nav-comp"
            onClick={(e) => handleElementChange(e, "post")}
          >
            Post Blog
          </span>
        </nav>

        <button className="login button" onClick={handleLoginButtonClick}>
          {loginState ? (
            <RotatingLines
              strokeColor="black"
              strokeWidth="4"
              animationDuration="1.00"
              width="32"
              visible={true}
            />
          ) : (
            "Login"
          )}
        </button>
        <div className={`loginModal ${loginState ? "show" : ""} `}>
          <div className="modalContent"></div>
        </div>
      </div>
      {activeComponent}
    </>
  );
};

export default Navbar;
