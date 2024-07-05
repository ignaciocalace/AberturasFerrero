import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/configFirestore.js";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/admin");
    }
  }, [navigate, setUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin");
    } catch (error) {
      setError(error.message);
    }
  };

  // const handleGoogleLogin = async () => {
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     setUser(user);
  //     localStorage.setItem("user", JSON.stringify(user)); // Guardar en localStorage
  //     navigate("/admin");
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="on"
        />
        <button type="submit">Login</button>
        {/* <button
          type="button"
          className="google-button"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button> */}
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
