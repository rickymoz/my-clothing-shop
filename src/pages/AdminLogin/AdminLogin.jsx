import React, { useState } from "react";
import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await addDoc(collection(db, "users"), { email, password });
      setMessage("User registered successfully");
    } catch (error) {
      setMessage("Error registering user: " + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email),
        where("password", "==", password)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        navigate("/admin");
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      setMessage("Error logging in: " + error.message);
    }
  };

  return (
    <div className="admin-container">
      <h1>{isRegister ? "REGISTER" : "LOGIN"}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isRegister ? handleRegister() : handleLogin();
        }}
      >
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button
        className="switch-button"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;
