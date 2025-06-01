import { Input } from "../ui/input";

type InputFormProps = {
  label: string;
  type: string;
  id: string;
  name: string;
};

function InputForm({ label, type, id, name }: InputFormProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <Input type={type} id={id} name={name} />
    </div>
  );
}

export default InputForm;
