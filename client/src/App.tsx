import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./components/Home";
import cloudHero from "./assets/images/cloud-hero.jpg";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{ backgroundImage: `url(${cloudHero})` }}
        className="min-h-screen bg-cover bg-center"
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
