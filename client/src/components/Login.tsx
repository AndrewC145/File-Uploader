import FormTemplate from "./FormTemplate";
import InputForm from "./InputForm";
import { Button } from "./ui/button";
import { Link } from "react-router";

function Login() {
  return (
    <FormTemplate title="Welcome to Packet!">
      <InputForm label="Username" type="text" id="username" name="username" />
      <InputForm label="Password" type="password" id="password" name="password" />
      <p className="mb-4">
        New to Packet?{" "}
        <Link className="text-blue-600 hover:underline" to="/register">
          Create an account
        </Link>
      </p>
      <Button type="submit" className="bg-blue-300 text-base hover:bg-blue-400">
        Login
      </Button>
    </FormTemplate>
  );
}

export default Login;
