import { AiFillFolder } from "react-icons/ai";
import "../css/UploadBlogs.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlog, postBlog } from "../reducers/blogSlice";
import Navbar from "../Components/Navbar";
import ConfirmUpload from "../Components/ConfirmUpload";
import {
  Alert,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import UploadIcon from "@mui/icons-material/Upload";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useNavigate } from "react-router-dom";

const UploadBlog = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user.userInfo);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    cover_image: "",
    content: "",
    author_id: activeUser?._id,
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handlePostingBlog = async () => {
    setBackdropOpen(true);
    setTimeout(() => {
      navigate("/", { replace: true });
      setBackdropOpen(false);
    }, 2000);
    dispatch(postBlog(newBlog));
    dispatch(fetchBlog());
    setOpenModal(false);
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
        setNewBlog({ ...newBlog, cover_image: imageUrl });
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <Box sx={{ padding: "12vh 2vh", gap: "2vh" }}>
          <Paper
            elevation={5}
            sx={{
              padding: "5vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2vh",
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Title"
              sx={{ width: "100%" }}
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: "0",
                flexWrap: "wrap",
                gap: "2vh",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  border: "1px solid lightgrey",
                  outline: "none",
                  cursor: "pointer",
                  borderRadius: "4px",
                  height: "6vh",
                  fontSize: "normal",
                  width: "auto",
                  padding: "0 2vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2vh",
                  color: "gray",
                }}
                onClick={() => document.querySelector("#cover-image").click()}
              >
                <Typography variant="p">Cover image</Typography>
                <AiFillFolder />
              </Box>
              <Button
                sx={{
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "normal",
                  justifyContent: "center",
                }}
                onClick={() => setOpen(true)}
                variant="outlined"
                disabled={newBlog.cover_image === ""}
                endIcon={<ImageIcon />}
              >
                Preview
              </Button>
            </Box>
          </Paper>
          <TextareaAutosize
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
            placeholder="Content of the blog"
            style={{
              border: "1px solid lightgrey",
              outline: "none",
              width: "100%",
              minHeight: "20vh",
              margin: "2vh 0",
              borderRadius: "6px",
              fontSize: "2.4vh",
              fontWeight: "100",
              padding: "16px",
            }}
          />
          <input
            type="file"
            id="cover-image"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageInput}
          />
        </Box>
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
      <Dialog open={open} sx={{ width: "100%" }}>
        <DialogTitle sx={{ display: "flex", width: "100%" }}>
          <Typography variant="h6">Selected Image</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={newBlog.cover_image}
            alt="cover_image"
            style={{ maxWidth: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ width: "20%" }}
            onClick={() => setOpen(false)}
            color="secondary"
            variant="contained"
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      {activeUser && (
        <Fab
          onClick={() => setOpenModal(true)}
          sx={{
            position: "fixed",
            bottom: "4vh",
            right: "4vh",
            height: "12vh",
            width: "12vh",
            backgroundColor: "lightcyan",
          }}
        >
          <UploadIcon sx={{ color: "darkblue", fontSize: "4vh" }} />
        </Fab>
      )}
      <ConfirmUpload
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => handlePostingBlog()}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default UploadBlog;
