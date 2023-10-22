import * as Joi from "joi";
import { Expiration } from "@/libs/redux/url/common.ts";

export const shorterFormSchema = Joi.object({
  url: Joi.string().uri(),
  expiration: Joi.string().allow("1t", "1d", "3d", "7d"),
});

export type ShorterForm = {
  url: string;
  expiration: Expiration;
};
