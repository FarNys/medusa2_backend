import { model } from "@medusajs/framework/utils";

export const Media = model.define("media", {
  id: model.id().primaryKey(),
  name: model.text().searchable(),
  url: model.text(),
});
