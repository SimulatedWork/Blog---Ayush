import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setUser } from "../reducers/userSlice";
import "../css/Login.css";
import { Alert, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ColorRing } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setOnScreenError] = useState(null);
  const activeUser = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      const data = await response.json();
      if (data.error) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setOnScreenError(data.error);
        dispatch(setError(data.error));
      } else {
        setOnScreenError(null);
        dispatch(setUser(data));
      }
    } catch (err) {
      console.log("Something went wrong.");
    }
  };

  useEffect(() => {
    if (activeUser) {
      setTimeout(() => {
        setLoading(false);
        navigate("/", { replace: true });
      }, 2000);
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
          type="text"
          required
          value={credential.email}
          onChange={(e) =>
            setCredential({ ...credential, email: e.target.value })
          }
          label="Email"
          disabled={loading}
          placeholder="Email"
        />
        <TextField
          type="password"
          required
          value={credential.password}
          onChange={(e) =>
            setCredential({ ...credential, password: e.target.value })
          }
          disabled={loading}
          label="Password"
        />
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleFormSubmit}
        >
          {loading ? (
            <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#f0f8ff", "#f0f8ff", "#f0f8ff", "#f0f8ff", "#f0f8ff"]}
            />
          ) : (
            "Login"
          )}
        </Button>
        <Button
          variant="outlined"
          disabled={loading}
          onClick={() => navigate("/users/signup", { replace: true })}
        >
          Sign up
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </div>
    </div>
  );
};

export default Login;
