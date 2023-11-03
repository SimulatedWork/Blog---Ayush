import "../css/About.css";
import Navbar from "../Components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="content-container">
        <h1>
          Get the most <br />
          <span>Curated Knowledge </span> <br />
          from Around the <br />
          World.
        </h1>
        <h1>
          <span>Discover, Post, Create</span>: <br />
          Your Gateway to{" "}
          <span>
            Global <br /> Insights.
          </span>
        </h1>
      </div>
    </>
  );
};

export default About;
