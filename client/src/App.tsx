import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Header from "./components/Home/Header";
import Home from "./components/Home/Home";
import Register from "./components/Forms/Register";
import Login from "./components/Forms/Login";
import Storage from "./components/storage/Storage";
import cloudBg from "./assets/images/cloud-hero.jpg";
import UserProvider from "./context/userProvider";
import StorageProvider from "./context/storageProvider";

function AppContext() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  if (isHome) {
    return (
      <UserProvider>
        <StorageProvider>
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
        </StorageProvider>
      </UserProvider>
    );
  }

  return (
    <>
      <UserProvider>
        <StorageProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/storage/:userId?/:folderId?/:folderName?" element={<Storage />} />
          </Routes>
        </StorageProvider>
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
