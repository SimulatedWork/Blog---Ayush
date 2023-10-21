import { AiFillFolder } from "react-icons/ai";
import "../css/UploadBlogs.css";

const UploadBlog = () => {
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
          />
          <div className="BlogCoverImage">
            <p>Choose a cover image for your blog</p>
            <AiFillFolder />
          </div>
          <input type="file" style={{ display: "none" }} />
          <button className="BlogPostingPublishButton">Publish</button>
        </div>
        <div className="BlogPostingContentContainer">
          <textarea name="content" className="blogContent" />
        </div>
      </div>
    </>
  );
};

export default UploadBlog;
