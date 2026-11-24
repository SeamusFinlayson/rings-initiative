import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ListXIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../../ui/popover";
import { Button } from "../../../ui/button";
import { removeFromInitiative } from "../../../helpers/removeFromInitiative";
import type { TokenGroup } from "../../../types/TokenGroup";
import { useContext, useState } from "react";
import { getMutedSurface } from "../../../helpers/colorCssHelpers";
import { ThemeModeContext } from "../../../helpers/themeModeContext";
import { RoomDataContext } from "../../../helpers/roomData/roomDataContext";
import { ReadyFilled } from "../../../icons/ReadyFilled";
import { ReactionFilled } from "../../../icons/ReactionFilled";
import { TurnsMenu } from "./TurnsMenu";
import { TriggeredActionMenu } from "./TriggeredActionMenu";

export function MoreOptionsPopover({
  tokenGroup,
  selectedItems,
  color,
  setSelection,
}: {
  tokenGroup: TokenGroup;
  selectedItems: string[];
  color: string | null;
  setSelection: (selection: string[]) => void;
}) {
  const roomData = useContext(RoomDataContext);
  const themeMode = useContext(ThemeModeContext);
  const backgroundColor = getMutedSurface(color, themeMode);

  const [subMenu, setSubMenu] = useState<"TURNS" | "TRIGGERED ACTIONS">();

  return (
    <Popover
      onOpenChangeComplete={(open) => {
        if (!open) setSubMenu(undefined);
      }}
    >
      <PopoverTrigger
        render={
          <Button title="Options" size={"icon"}>
            <MoreVerticalIcon />
          </Button>
        }
      />
      <PopoverContent style={{ backgroundColor }} className="overflow-y-auto">
        <PopoverHeader hidden={!subMenu}>
          <PopoverTitle className="flex items-center gap-2 capitalize">
            <Button size={"icon-sm"} onClick={() => setSubMenu(undefined)}>
              <ArrowLeftIcon />
            </Button>
            <div>{subMenu ? subMenu.toLowerCase() : "Token Options"}</div>
          </PopoverTitle>
        </PopoverHeader>
        {subMenu === "TURNS" && (
          <div className="p-2.5 pt-0">
            <TurnsMenu
              tokenGroup={tokenGroup}
              selectedItems={selectedItems}
              setSelection={setSelection}
            />
          </div>
        )}
        {subMenu === "TRIGGERED ACTIONS" && (
          <div className="p-2.5 pt-0">
            <TriggeredActionMenu
              tokenGroup={tokenGroup}
              selectedItems={selectedItems}
              setSelection={setSelection}
            />
          </div>
        )}
        {!subMenu && (
          <div className="p-2">
            <Button
              variant={"ghost"}
              className="w-full justify-start"
              onClick={() => {
                setSubMenu("TURNS");
              }}
            >
              <ReadyFilled />
              <div>Turns</div>
              <div className="grow" />
              <ChevronRightIcon />
            </Button>
            {!roomData.hideReaction && (
              <Button
                variant={"ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setSubMenu("TRIGGERED ACTIONS");
                }}
              >
                <ReactionFilled />
                <div>Triggered Actions</div>
                <div className="grow" />
                <ChevronRightIcon />
              </Button>
            )}
            <Button
              variant={"ghost"}
              className="w-full justify-start"
              onClick={() => {
                removeFromInitiative(
                  tokenGroup.tokens.filter((token) =>
                    selectedItems.includes(token.item.id),
                  ),
                );
                setSelection([]);
              }}
            >
              <ListXIcon />
              <div>Remove Initiaitve</div>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
