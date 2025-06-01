import FormTemplate from "../FormTemplate";
import { Link } from "react-router";
import InputForm from "./InputForm";
import FormBtn from "./FormBtn";

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
      <FormBtn description="Login" />
    </FormTemplate>
  );
}

export default Login;
