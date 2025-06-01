import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/Home/Header";
import Home from "./components/Home/Home";
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
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
