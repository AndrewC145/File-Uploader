/* eslint-disable @typescript-eslint/no-explicit-any */
import FormTemplate from "./FormTemplate";
import { Link } from "react-router";
import InputForm from "./InputForm";
import FormBtn from "./FormBtn";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const PORT = import.meta.env.VITE_API_URL;
  const action = `${PORT}/login`;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        navigate("/storage", { replace: true });
      }
    }, 2000);
  }, [isLoggedIn, navigate]);

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(action, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setSuccess(response.data.message);
      setError("");
      setIsLoggedIn(true);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.error);
      setIsLoggedIn(false);
      setSuccess("");
    }
  };
  return (
    <FormTemplate onSubmit={handleLogin} title="Welcome to Packet!">
      <InputForm label="Username" type="text" id="username" name="username" />
      <InputForm label="Password" type="password" id="password" name="password" />
      <p className="mb-4">
        New to Packet?{" "}
        <Link className="text-blue-600 hover:underline" to="/register">
          Create an account
        </Link>
      </p>
      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
      {success && <p className="mb-3 text-sm text-green-400">{success}</p>}
      <FormBtn description="Login" />
    </FormTemplate>
  );
}

export default Login;
