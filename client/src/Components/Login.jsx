import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/v1/users/login", {
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
        // Handle the JSON data here
        // console.log(data?.profile);
        console.log(data);
      })
      .catch((err) => {
        // Handle any errors that occurred during the fetch
        console.error(err);
      });
  };
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2>Bloggery</h2>
      <h3>Login</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          required
          value={cred.email}
          onChange={(e) => setCred({ ...cred, email: e.target.value })}
        />
        <input
          type="password"
          required
          value={cred.password}
          onChange={(e) => setCred({ ...cred, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/users/signup", { replace: true })}>
        Sign up
      </button>
    </div>
  );
};

export default Login;
