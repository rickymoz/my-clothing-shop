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
import bcrypt from "bcryptjs";
import { Shield } from "lucide-react";
import "./AdminLogin.css";

const generateToken = () => {
  return `${Math.random().toString(36).substr(2)}${Date.now().toString(36)}`;
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegister = async () => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        setLoginError("User already exists. Please login.");
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const token = generateToken();
      await addDoc(collection(db, "users"), {
        email,
        password: hashedPassword,
        token,
      });
      setLoginError("User registered successfully. You can now login.");
    } catch (error) {
      setLoginError("Error registering user: " + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        if (bcrypt.compareSync(password, userData.password)) {
          const newToken = generateToken();
          await updateDoc(userDoc.ref, { token: newToken });
          localStorage.setItem("authToken", newToken);
          login();
          navigate("/products");
        } else {
          setLoginError("Invalid credentials");
        }
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (error) {
      setLoginError("Error logging in: " + error.message);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">
        ADMIN <Shield size={20} color="#4338ca" />
      </h1>
      <p className="admin-warning">
        This page is for authorized administrators only. Visitors cannot log in
        here.
      </p>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="user">Email</label>
          <input
            id="user"
            type="text"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginError && <p className="error-message">{loginError}</p>}
        <button type="submit">Login</button>
      </form>
      <div className="register off">
        <h2>Register</h2>
        <div className="input-group">
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default AdminLogin;
