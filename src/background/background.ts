import OBR from "@owlbear-rodeo/sdk";
import { getPluginId } from "../getPluginId";

const icon = new URL("./status.svg#icon", import.meta.url).toString();

/**
 * This file represents the background script run when the plugin loads.
 * It creates the context menu item for the status ring.
 */

OBR.onReady(() => {
  OBR.contextMenu.create({
    id: getPluginId("initiative-rings-menu"),
    icons: [
      {
        icon,
        label: "Initiaitive Rings",
        filter: {
          every: [
            { key: "layer", value: "MOUNT", coordinator: "||" },
            { key: "layer", value: "CHARACTER" },
            { key: "type", value: "IMAGE" },
          ],
          permissions: ["UPDATE"],
        },
      },
    ],
    embed: {
      url: "/",
      height: 88,
    },
  });
});
