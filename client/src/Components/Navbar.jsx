import { useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    const routes = ["/", "/about", "/profile", "/upload"];
    if (!routes.includes(path)) {
      const navComponents = document.querySelectorAll(".nav-comp");
      navComponents.forEach((el) => {
        el.classList.remove("active-space");
      });
    }
  }, [path]);
  const handleElementChange = (e, componentName) => {
    const navComponents = document.querySelectorAll(".nav-comp");
    navComponents.forEach((el) => {
      el.classList.remove("active-space");
    });
    if (componentName == "blogs") {
      navigate("/", { replace: true });
    } else {
      navigate(`/${componentName}`, { replace: true });
    }
    e.target.classList.add("active-space");
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
            onClick={(e) => handleElementChange(e, "upload")}
          >
            Post Blog
          </span>
        </nav>
        {isAuthenticated ? (
          <button className="login button" onClick={() => logout()}>
            Logout
          </button>
        ) : (
          <button className="login button" onClick={() => loginWithRedirect()}>
            Login
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
