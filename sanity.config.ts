import { Config } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";
import { UserSchema } from "./schemas/user";
import { TokenSchema } from "./schemas/token";
import { AccountSchema } from "./schemas/account";
// import { getStartedPlugin } from "./plugins/sanity-plugin-tutorial";

// const devOnlyPlugins = [getStartedPlugin()];

export const config: any = {
  name: "default",
  title: "purple-weasel",
  projectId: "yawjfnlv",
  dataset: "production",
  basePath: "/studio",

  //   plugins: [deskTool(), visionTool(),
  //     ...(isDev ? devOnlyPlugins : [])],
  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
    // types: schemaTypes.concat([UserSchema, TokenSchema, AccountSchema]),
  },
};
