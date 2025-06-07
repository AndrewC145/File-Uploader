import InputForm from "./InputForm";
import FormBtn from "./FormBtn";
import FormTemplate from "./FormTemplate";

function Register() {
  const PORT = import.meta.env.VITE_API_URL;
  const action = `${PORT}/register`;
  return (
    <FormTemplate title="Create an account" action={action}>
      <InputForm label="Username" type="text" id="username" name="username" />
      <InputForm label="Password" type="password" id="password" name="password" />
      <InputForm
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
      />
      <FormBtn description="Register" />
    </FormTemplate>
  );
}

export default Register;
