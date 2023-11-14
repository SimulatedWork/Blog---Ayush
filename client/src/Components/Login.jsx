import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setUser } from "../reducers/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const activeUser = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(activeUser);
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

      // if (!response.ok) {
      //   throw new Error("Login failed");
      // }

      const data = await response.json();
      if (data.error) {
        dispatch(setError(data.error));
      } else {
        dispatch(setUser(data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeUser?.userInfo) {
      navigate("/", { replace: true });
    }
  }, [activeUser, navigate]);

  return (
    <div className="container">
      <h2>Bloggery</h2>
      <h3>Login</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          required
          value={credential.email}
          onChange={(e) =>
            setCredential({ ...credential, email: e.target.value })
          }
          disabled={loading}
        />
        <input
          type="password"
          required
          value={credential.password}
          onChange={(e) =>
            setCredential({ ...credential, password: e.target.value })
          }
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <button onClick={() => navigate("/users/signup", { replace: true })}>
        Sign up
      </button>
    </div>
  );
};

export default Login;
