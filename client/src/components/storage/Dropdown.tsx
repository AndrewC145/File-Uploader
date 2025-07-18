import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

function DropDown({
  onFunctionClick,
  icon,
}: {
  onFunctionClick?: () => void;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="cursor-pointer" size="icon">
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[80px]">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onFunctionClick} className="cursor-pointer text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDown;
