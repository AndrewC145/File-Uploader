import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/home/Header";
import Home from "./components/home/Home";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import Storage from "./components/storage/Storage";
import cloudBg from "./assets/images/cloud-hero.jpg";
import UserProvider from "./context/userProvider";

function AppContext() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (isHome) {
    return (
      <UserProvider>
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
      </UserProvider>
    );
  }

  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/storage" element={<Storage />} />
        </Routes>
      </UserProvider>
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
