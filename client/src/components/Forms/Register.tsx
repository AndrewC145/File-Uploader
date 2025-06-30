import InputForm from "./InputForm";
import FormBtn from "./FormBtn";
import FormTemplate from "./FormTemplate";
import axios from "axios";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

async function createInitialFolder(userId: string) {
  const dummyFileName = "Home/.placeholder.txt";
  const dummyFileContent = new Blob(["Placeholder content, safe to delete"], {
    type: "text/plain",
  });

  const { data, error } = await supabase.storage
    .from("users")
    .upload(`${userId}/${dummyFileName}`, dummyFileContent);

  if (error) {
    console.error("Error creating initial folder:", error);
    throw new Error("Failed to create initial folder");
  } else {
    console.log("Initial folder created successfully:", data);
  }
}

function Register() {
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");

  const PORT = import.meta.env.VITE_API_URL;
  const action = `${PORT}/register`;

  const handleRegister: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
      console.log(response);
      setSuccess(response.data.message);
      setError([]);
      await createInitialFolder(response.data.user.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error registering user:", error);
      setError(error.response.data.error);
      setSuccess("");
    }
  };

  return (
    <FormTemplate onSubmit={handleRegister} title="Create an account">
      <InputForm label="Username" type="text" id="username" name="username" />
      <InputForm label="Password" type="password" id="password" name="password" />
      <InputForm
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
      />
      {error.length > 0 &&
        error.map((err, index) => (
          <p className="mb-2 text-sm text-red-400" key={index}>
            {err}
          </p>
        ))}
      {success && <p className="text-sm text-green-400">{success}</p>}
      <FormBtn description="Register" />
    </FormTemplate>
  );
}

export default Register;
