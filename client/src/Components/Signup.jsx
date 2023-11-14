import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
  });
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
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((e) => {
        console.log(e);
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
          placeholder="Name"
          onChange={(e) => setCred({ ...cred, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          required
          onChange={(e) => setCred({ ...cred, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setCred({ ...cred, password: e.target.value })}
        />
        <button type="submit">Sign up</button>
      </form>
      <button onClick={() => navigate("/users/login", { replace: true })}>
        Login
      </button>
    </div>
  );
};

export default Signup;
