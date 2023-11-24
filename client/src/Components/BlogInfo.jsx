import "../css/BlogInfo.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Fab, Paper, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { deleteBlog, fetchBlog, likeBlog } from "../reducers/blogSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModel";
const BlogInfo = () => {
  const activeUser = useSelector((state) => state.user.userInfo);
  const blogs = useSelector((state) => state.blog.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [relativeTime, setRelativeTime] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const param = useLocation();
  const blog_id = param.pathname.split("/")[2];
  const handleLikeFunctionality = (id) => {
    dispatch(likeBlog(id));
    dispatch(fetchBlog());
  };

  useEffect(() => {
    setBlogData(blogs.filter((blog) => blog._id === blog_id)[0]);
    const currentTime = new Date().getTime();
    const postTime = new Date(blogData?.created_at).getTime();
    const difference = currentTime - postTime;
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    if (years > 0) {
      setRelativeTime(`${years} ${years === 1 ? "year" : "years"} ago`);
    } else if (months > 0) {
      setRelativeTime(`${months} ${months === 1 ? "month" : "months"} ago`);
    } else if (days > 0) {
      setRelativeTime(`${days} ${days === 1 ? "day" : "days"} ago`);
    } else if (hours > 0) {
      setRelativeTime(`${hours} ${hours === 1 ? "hr" : "hrs"} ago`);
    } else if (minutes > 0) {
      setRelativeTime(`${minutes} ${minutes === 1 ? "min" : "mins"} ago`);
    } else {
      setRelativeTime(`${seconds} ${seconds === 1 ? "sec" : "secs"} ago`);
    }
  }, [blogData, blog_id, blogs]);

  const handleBlogDeletion = (blogId) => {
    dispatch(deleteBlog(blogId)).then(() => {
      navigate("/");
    });
    dispatch(fetchBlog());
    setIsConfirmationOpen(false);
  };

  if (!blogData) {
    return <>Loading...</>;
  }
  return (
    <Paper sx={{ minHeight: "100vh", backgroundColor: "aliceblue" }}>
      <Fab
        sx={{
          position: "absolute",
          height: "5vh",
          width: "5vh",
          margin: "2vh",
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNewIcon />
      </Fab>
      <img className="cover-image" src={blogData?.cover_image} />
      <Box
        sx={{
          padding: "2vh",
        }}
      >
        <Typography
          variant="h5"
          sx={{ lineHeight: "5vh", letterSpacing: "1.6px" }}
        >
          {blogData?.title}
        </Typography>
        <Typography variant="h6">{blogData?.author_id.name}</Typography>
        <Typography variant="h7">{relativeTime}</Typography>
        <Stack direction="row" spacing={5} marginTop={5} marginBottom={5}>
          <Fab
            aria-label="like"
            onClick={() => handleLikeFunctionality(blogData._id)}
          >
            <FavoriteBorderIcon />
            <Typography>{blogData?.likes.length}</Typography>
          </Fab>
          {activeUser && activeUser.email === blogData?.author_id.email && (
            <Fab
              aria-label="delete"
              onClick={() => setIsConfirmationOpen(true)}
            >
              <DeleteForeverIcon />
            </Fab>
          )}
        </Stack>
        <Typography
          variant="p"
          sx={{ lineHeight: "16px", letterSpacing: "1.2px" }}
        >
          {blogData?.content}
        </Typography>
      </Box>
      <ConfirmationModal
        open={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={() => handleBlogDeletion(blogData._id)}
      />
    </Paper>
  );
};

export default BlogInfo;
