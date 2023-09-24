import { AccountSchema } from "./account";
import { CategorySchema } from "./category";
import { GoodsSchema } from "./goods";
import { TokenSchema } from "./token";
import { UserSchema } from "./user";

export const schemaTypes = [
  GoodsSchema,
  CategorySchema,
  UserSchema,
  TokenSchema,
  AccountSchema,
];
