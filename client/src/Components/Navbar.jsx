import { useState } from "react";
import "../css/Navbar.css";
import { RotatingLines } from "react-loader-spinner";
import { BsSearch } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const Navbar = () => {
  const [loginState, setLoginState] = useState(false);
  const handleElementChange = (e) => {
    const navComponents = document.querySelectorAll(".nav-comp");
    navComponents.forEach((el) => {
      el.classList.remove("active-space");
    });
    e.target.classList.add("active-space");
  };
  const handleLoginButtonClick = () => {
    setLoginState(true);
  };
  return (
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
          onClick={(e) => handleElementChange(e)}
        >
          Blogs
        </span>
        <span className="nav-comp" onClick={(e) => handleElementChange(e)}>
          About?
        </span>
        <span className="nav-comp" onClick={(e) => handleElementChange(e)}>
          Profile
        </span>
        <span className="nav-comp" onClick={(e) => handleElementChange(e)}>
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
    </div>
  );
};

export default Navbar;
