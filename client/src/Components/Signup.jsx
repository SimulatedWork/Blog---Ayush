import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError, setUser } from "../reducers/userSlice";
import "../css/Login.css";
import { Alert, Button, TextField, Typography } from "@mui/material";

const Signup = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setOnScreenError] = useState(null);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(cred),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setOnScreenError(data.error);
          dispatch(setError(data.error));
        } else {
          dispatch(setUser(data));
        }
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  };
  useEffect(() => {
    if (activeUser) {
      navigate("/", { replace: true });
    }
  }, [activeUser, navigate]);
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div className="login-container">
        <Typography variant="h5">Bloggery</Typography>
        <Typography variant="p">Login</Typography>
        <TextField
          variant="outlined"
          label="Name"
          type="text"
          required
          value={cred.name}
          onChange={(e) => setCred({ ...cred, name: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="Email"
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setCred({ ...cred, email: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setCred({ ...cred, password: e.target.value })}
        />
        <Button onClick={handleFormSubmit} variant="contained">
          Sign up
        </Button>
        <Button
          onClick={() => navigate("/users/login", { replace: true })}
          variant="outlined"
        >
          Login
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </div>
    </div>
  );
};

export default Signup;
