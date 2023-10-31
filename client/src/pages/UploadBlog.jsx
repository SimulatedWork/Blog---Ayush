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
  const [category, setCategory] = useState(data);
  const [newCategory, setNewCategory] = useState("");
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
    if (event.keyCode == 13 && newCategory.trim() != "") {
      event.target.value = "";
      log("Enter key pressed");
      setNewBlog({
        ...newBlog,
        categories: [...newBlog.categories, newCategory],
      });
      setCategory([
        ...category,
        { id: category.length + 1, name: newCategory },
      ]);
    }
  };
  const handleImageInput = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        const imageUrl = data.secure_url;
        setNewBlog({ ...newBlog, image: imageUrl });
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
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
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={handleCategoryAddititon}
            />
            <p className="addCategoryDirections">
              Write the category name and press enter.
            </p>
          </div>

          <div className="categories">
            {category.map((categories) => {
              return (
                <div
                  className="category"
                  key={categories.id}
                  onClick={(e) => handleCategoryClick(e, categories.name)}
                >
                  {categories.name}
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
          {newBlog.image === "" ? (
            ""
          ) : (
            <a
              style={{
                textDecoration: "none",
              }}
              href={newBlog.image}
              target="_blank"
              rel="noreferrer noopener"
            >
              Selected Image
            </a>
          )}
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
