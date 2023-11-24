import { Alert, Paper, Typography } from "@mui/material";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import "../css/Profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const activeUser = useSelector((state) => state.user.userInfo);
  const blogs = useSelector((state) => state.blog.blogs);
  const userBlogs = blogs.filter((blog) => {
    return blog.author_id.email == activeUser?.email;
  });
  const isAuthenticated = activeUser !== null;
  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <>
          <div className="userInfo-container">
            <img
              src={activeUser.profile}
              alt="profile-image"
              className="userProfile-image"
            />
            <div className="userInfo">
              <span>{activeUser.name}</span>
              <span>{activeUser.email}</span>
            </div>
          </div>
          <div className="blog-grid-container">
            {userBlogs.length !== 0 ? (
              userBlogs.map((blog) => {
                return <Card key={blog._id} blog={blog} />;
              })
            ) : (
              <Paper
                sx={{
                  backgroundColor: "lightcyan",
                  padding: "5vh",
                  margin: "10vh 0",
                }}
              >
                <Alert severity="info">
                  Blogs that you upload will show up here.
                </Alert>
              </Paper>
            )}
          </div>
        </>
      ) : (
        <Paper
          sx={{
            height: "100vh",
            width: "100%",
            display: "grid",
            placeItems: "center",
            padding: "5vh",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "lightcyan",
              padding: "5vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2vh"
            }}
          >
            <Alert severity="warning">You are logged out.</Alert>
            <Typography>
              Please login to <strong>Bloggery</strong> to view your profile.
            </Typography>
          </Paper>
        </Paper>
      )}
    </>
  );
};

export default Profile;
