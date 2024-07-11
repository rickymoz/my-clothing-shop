import React, { useState, useEffect } from "react";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import "./AdminLogin.css";

const generateToken = () => {
  return `${Math.random().toString(36).substr(2)}${Date.now().toString(36)}`;
};

const AdminLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  const handleRegister = async () => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        setMessage("User already exists. Please login.");
        return;
      }

      const token = generateToken();
      await addDoc(collection(db, "users"), { email, password, token });
      setMessage("User registered successfully. You can now login.");
      setIsRegister(false);
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
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const newToken = generateToken();

        await updateDoc(userDoc.ref, { token: newToken });
        localStorage.setItem("authToken", newToken);
        login();
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
