import React from "react";
import { Routes, Route } from "react-router-dom";
import FrontPage from "./pages/FrontPage/FrontPage";
import Products from "./pages/Products/Products";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="content-wrap">
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
