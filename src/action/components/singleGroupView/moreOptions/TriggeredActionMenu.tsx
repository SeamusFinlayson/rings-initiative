import { useState } from "react";
import { updateItemInitiaitiveData } from "../../../helpers/itemInitiativeData";
import { Button } from "../../../ui/button";
import { Counter } from "./Counter";
import { PopoverClose } from "../../../ui/popover";
import type { TokenGroup } from "../../../types/TokenGroup";

export function TriggeredActionMenu({
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

  const [newReactionsMaximum, setNewReactionsMaximum] = useState(
    Math.min(...targets.map((target) => target.data.reactionsMaximum)),
  );

  return (
    <div className="flex justify-between">
      <Counter value={newReactionsMaximum} setValue={setNewReactionsMaximum} />
      <PopoverClose
        render={
          <Button
            size={"sm"}
            variant={"transparent"}
            onClick={() => {
              updateItemInitiaitiveData(
                targets.map((token) => {
                  const ReactionsTaken =
                    token.data.reactionsMaximum - token.data.reactions;
                  let newReactions = newReactionsMaximum - ReactionsTaken;
                  if (newReactions < 0) newReactions = 0;
                  if (newReactions > 99) newReactions = 99;

                  return {
                    itemId: token.item.id,
                    data: {
                      reactions: newReactions,
                      reactionsMaximum: newReactionsMaximum,
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
