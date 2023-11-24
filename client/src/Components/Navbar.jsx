import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../reducers/userSlice";
import { useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user.userInfo);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const SideList = () => (
    <Box
      sx={{ width: 250, cursor: "pointer" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {activeUser && (
        <Box
          sx={{
            backgroundColor: "aliceblue",
            height: "16vh",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "5vh",
            color: "darkcyan"
          }}
        >
          <Typography>{activeUser.email}</Typography>
          <Typography>{activeUser.name}</Typography>
        </Box>
      )}
      <List style={{ padding: "0 5%" }}>
        {activeUser && (
          <ListItem onClick={() => dispatch(clearUser())}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
        <ListItem>
          <ListItemText
            primary="Profile"
            onClick={() => {
              navigate("/profile", { replace: true });
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Upload"
            onClick={() => {
              navigate("/upload", { replace: true });
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Blogs"
            onClick={() => {
              navigate("/", { replace: true });
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: "aliceblue" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box
              sx={{
                flexGrow: 0,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {activeUser == null ? (
                <Button
                  variant="outlined"
                  sx={{ width: "5vh" }}
                  onClick={() => navigate("/users/login", { replace: true })}
                >
                  Login
                </Button>
              ) : (
                <Avatar
                  alt={activeUser?.name}
                  src={activeUser?.profile}
                  sx={{ border: "1px solid #000" }}
                />
              )}
              <IconButton
                color="black"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="end"
                sx={{ width: "5vh" }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {SideList()}
      </Drawer>
    </>
  );
};
export default Navbar;
