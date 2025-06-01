import { Button } from "../ui/button";

function FormBtn({ description }: { description: string }) {
  return (
    <Button type="submit" className="cursor-pointer bg-blue-300 text-base hover:bg-blue-400">
      {description}
    </Button>
  );
}

export default FormBtn;
