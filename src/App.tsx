import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Affiliates from "./pages/Affiliates";
import Blog from "./pages/Blog";
import Donate from "./pages/Donate";
import About from "./pages/About";
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/affiliates" element={<Affiliates />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
