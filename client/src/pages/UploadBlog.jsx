import { AiFillFolder } from "react-icons/ai";
import "../css/UploadBlogs.css";
import data from "../testing_data/category.json";
import { useState } from "react";
const log = console.log;

const UploadBlog = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    categories: [],
    image: "",
    content: "",
  });
  const handleCategoryClick = (e, name) => {
    if (newBlog.categories.includes(name)) {
      const updatedCategories = newBlog.categories.filter(
        (category) => category !== name
      );
      setNewBlog({ ...newBlog, categories: updatedCategories });
      e.target.style.backgroundColor = "#ffffff";
    } else {
      const updatedCategories = [...newBlog.categories, name];
      setNewBlog({ ...newBlog, categories: updatedCategories });
      e.target.style.backgroundColor = "#5effc5";
    }
  };
  const handleCategoryAddititon = (event) => {
    event.preventDefault();
    if (event.keyCode == 13) {
      log("Enter key is pressed");
    }
  };
  const handleImageInput = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader(file);
    fileReader.onloadend(fileReader.result);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }} className="BlogPostingHead">
        {" "}
        <span>Create</span> And <span>Post</span> A New Blog:
      </h1>
      <div className="BlogPostingParentContainer">
        <div className="BlogPostingInputContainer">
          <input
            type="text"
            className="BlogTitle"
            placeholder="Title for your blog post:"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          />
          <div>
            <input
              type="text"
              className="BlogCategory"
              placeholder="Add a new category"
              onKeyDown={handleCategoryAddititon}
            />
            <p className="addCategoryDirections">
              Write the category name and press enter.
            </p>
          </div>

          <div className="categories">
            {data.map((category) => {
              return (
                <div
                  className="category"
                  key={category.id}
                  onClick={(e) => handleCategoryClick(e, category.name)}
                >
                  {category.name}
                </div>
              );
            })}
          </div>
          <div
            className="BlogCoverImage"
            onClick={() => document.querySelector("#postImage").click()}
          >
            <p>Choose a cover image for your blog</p>
            <AiFillFolder />
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            id="postImage"
            accept="image/*"
            onInput={(e) => handleImageInput(e)}
          />
          <button
            className="BlogPostingPublishButton"
            onClick={() => log(newBlog)}
          >
            Publish
          </button>
        </div>
        <div className="BlogPostingContentContainer">
          <textarea
            name="content"
            className="blogContent"
            placeholder="Your content goes here..."
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
          />
        </div>
      </div>
    </>
  );
};

export default UploadBlog;
