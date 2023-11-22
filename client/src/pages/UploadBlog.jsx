import { AiFillFolder } from "react-icons/ai";
import "../css/UploadBlogs.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlog, postBlog } from "../reducers/blogSlice";
import Navbar from "../Components/Navbar";
import { Alert, Box, Paper, Typography } from "@mui/material";

const UploadBlog = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user.userInfo);
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
      <Navbar />
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
        <Box
          sx={{
            height: "100vh",
            width: "auto",
            margin: "0 5vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Paper
            sx={{
              backgroundColor: "lightcyan",
              padding: "5vh",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2vh",
            }}
          >
            <Alert severity="warning">You are Logged Out!</Alert>
            <Typography variant="h7">
              Please login to <strong>Bloggery</strong> to upload blogs
            </Typography>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default UploadBlog;
