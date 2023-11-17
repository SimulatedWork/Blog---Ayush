import { AiFillFolder } from "react-icons/ai";
import "../css/UploadBlogs.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlog, postBlog } from "../reducers/blogSlice";

const UploadBlog = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user.userInfo);
  const blogState = useSelector((state) => state.blog);
  console.log(blogState);
  const [newBlog, setNewBlog] = useState({
    title: "",
    cover_image: "",
    content: "",
    author_id: activeUser?._id,
  });
  const handlePostingBlog = async () => {
    dispatch(postBlog(newBlog));
    dispatch(fetchBlog());
  };
  const isAuthenticated = activeUser !== null;
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
      {isAuthenticated ? (
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
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
              />
              <div>
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
                  onClick={handlePostingBlog}
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
          </div>
        </>
      ) : (
        <div className="loginContainer">
          <img src={"/login.svg"} alt="login" height={350} />
          <h1>
            You are logged out, Login to post blogs to <strong>Bloggery</strong>
          </h1>
          <button onClick={() => alert()}>Login</button>
        </div>
      )}
      ;
    </>
  );
};

export default UploadBlog;
