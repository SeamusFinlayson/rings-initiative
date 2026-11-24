import { useState } from "react";
import { updateItemInitiaitiveData } from "../../../helpers/itemInitiativeData";
import type { TokenGroup } from "../../../types/TokenGroup";
import { Button } from "../../../ui/button";
import { PopoverClose } from "../../../ui/popover";
import { Counter } from "./Counter";

export function TurnsMenu({
  tokenGroup,
  selectedItems,
  setSelection,
}: {
  tokenGroup: TokenGroup;
  selectedItems: string[];
  setSelection: (selection: string[]) => void;
}) {
  const targets = tokenGroup.tokens.filter((token) =>
    selectedItems.includes(token.item.id),
  );

  const [newTurnsMaximum, setNewTurnsMaximum] = useState(
    Math.min(...targets.map((target) => target.data.turnsMaximum)),
  );

  return (
    <div className="flex justify-between">
      <Counter value={newTurnsMaximum} setValue={setNewTurnsMaximum} />
      <PopoverClose
        render={
          <Button
            size={"sm"}
            variant={"transparent"}
            onClick={() => {
              updateItemInitiaitiveData(
                targets.map((token) => {
                  const turnsTaken = token.data.turnsMaximum - token.data.turns;
                  let newTurns = newTurnsMaximum - turnsTaken;
                  if (newTurns < 0) newTurns = 0;
                  if (newTurns > 99) newTurns = 99;

                  return {
                    itemId: token.item.id,
                    data: {
                      turns: newTurns,
                      turnsMaximum: newTurnsMaximum,
                    },
                  };
                }),
              );
              setSelection([]);
            }}
          >
            Apply
          </Button>
        }
      />
    </div>
  );
}
