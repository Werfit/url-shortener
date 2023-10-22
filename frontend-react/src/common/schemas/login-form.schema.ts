import * as Joi from "joi";
import {
  AuthenticationMessages,
  AuthenticationRules,
} from "@/common/schemas/common";

export const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .pattern(AuthenticationRules.EMAIL_PATTERN)
    .messages({
      "string.empty": AuthenticationMessages.EMAIL_NOT_EMPTY,
      "string.pattern.base": AuthenticationMessages.EMAIL_PATTERN,
    }),
  password: Joi.string().required().messages({
    "string.empty": AuthenticationMessages.PASSWORD_MIN,
  }),
});

export type LoginForm = {
  email: string;
  password: string;
};
