import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../reducers/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user.userInfo);

  return (
    <AppBar position="static" style={{ backgroundColor: "aliceblue" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {activeUser !== null ? (
              <Button
                variant="outlined"
                style={{ padding: "0 5vh" }}
                onClick={() => dispatch(clearUser())}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => navigate("/users/login", { replace: true })}
              >
                Login
              </Button>
            )}
            {activeUser && (
              <IconButton onClick sx={{ p: 0 }}>
                <Avatar
                  alt={activeUser?.name}
                  src={activeUser?.profile}
                  sx={{ border: "1px solid #000" }}
                />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
