import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/Header";
import Home from "./components/Home";
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
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
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
