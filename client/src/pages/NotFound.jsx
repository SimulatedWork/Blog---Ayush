import "../css/NotFound.css";
import Navbar from "../Components/Navbar";

const NotFound = () => {
  const url = new URL(location.href);
  const path = url.pathname;
  console.log(path);
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>
          Sorry, No such endpoint as <span>{path}</span>
        </h1>
        <img src="/notfound.svg" alt="Not found" height={350} />
      </div>
    </>
  );
};

export default NotFound;
