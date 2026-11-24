import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../../ui/button";

export function Counter({
  value,
  setValue,
  range = { min: 1, max: 99 },
}: {
  value: number;
  setValue: (value: number) => void;
  range?: { min: number; max: number };
}) {
  return (
    <div className="flex gap-0.5">
      <Button
        size={"icon-sm"}
        variant={"transparent"}
        disabled={value <= range.min}
        onClick={() => setValue(value - 1)}
      >
        <MinusIcon />
      </Button>
      <div className="grid size-8 place-items-center">{value}</div>
      <Button
        size={"icon-sm"}
        variant={"transparent"}
        disabled={value >= range.max}
        onClick={() => setValue(value + 1)}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
