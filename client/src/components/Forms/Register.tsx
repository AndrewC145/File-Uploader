import InputForm from "./InputForm";
import FormBtn from "./FormBtn";

function Register() {
  return (
    <main className="flex min-h-screen items-center justify-center font-nunito">
      <form className="flex w-[30%] flex-col gap-4 rounded-2xl border-2 border-blue-300 p-4 sm:gap-5 sm:p-6 md:gap-6 md:p-8 lg:px-10 xl:gap-8 xl:px-12">
        <h1 className="text-center text-2xl">Create An Account</h1>
        <InputForm label="Username" type="text" id="username" name="username" />
        <InputForm label="Password" type="password" id="password" name="password" />
        <InputForm
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />
        <FormBtn description="Register" />
      </form>
    </main>
  );
}

export default Register;
