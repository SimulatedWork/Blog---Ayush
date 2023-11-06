import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(
    document.querySelectorAll(".nav-comp")[0]
  );

  useEffect(() => {
    console.log(activeComponent);
  }, [activeComponent]);

  const handleElementChange = (e, componentName) => {
    setActiveComponent(e.target);
    navigate(`/${componentName}`, { replace: true });
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
            className={`nav-comp ${
              activeComponent == null
                ? ""
                : activeComponent == document.querySelectorAll(".nav-comp")[0]
                ? "active-space"
                : ""
            }`}
            onClick={(e) => handleElementChange(e, "")}
          >
            Blogs
          </span>
          <span
            className={`nav-comp ${
              activeComponent == null
                ? ""
                : activeComponent == document.querySelectorAll(".nav-comp")[1]
                ? "active-space"
                : ""
            }`}
            onClick={(e) => handleElementChange(e, "about")}
          >
            About?
          </span>
          <span
            className={`nav-comp ${
              activeComponent == null
                ? ""
                : activeComponent == document.querySelectorAll(".nav-comp")[2]
                ? "active-space"
                : ""
            }`}
            onClick={(e) => handleElementChange(e, "profile")}
          >
            Profile
          </span>
          <span
            className={`nav-comp ${
              activeComponent == null
                ? ""
                : activeComponent == document.querySelectorAll(".nav-comp")[3]
                ? "active-space"
                : ""
            }`}
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
