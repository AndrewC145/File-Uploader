import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/home/Header";
import Home from "./components/home/Home";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import cloudBg from "./assets/images/cloud-hero.jpg";

function AppContext() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (isHome) {
    return (
      <div
        style={{
          backgroundImage: `url(${cloudBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <Home />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContext />
    </BrowserRouter>
  );
}

export default App;
