import * as Joi from "joi";
import {
  AuthenticationMessages,
  AuthenticationRules,
} from "@/common/schemas/common";

export const signUpSchema = Joi.object({
  email: Joi.string()
    .required()
    .pattern(AuthenticationRules.EMAIL_PATTERN)
    .messages({
      "string.empty": AuthenticationMessages.EMAIL_NOT_EMPTY,
      "string.pattern.base": AuthenticationMessages.EMAIL_PATTERN,
    }),
  password: Joi.string()
    .required()
    .min(AuthenticationRules.PASSWORD_MIN)
    .max(AuthenticationRules.PASSWORD_MAX)
    .pattern(AuthenticationRules.PASSWORD_PATTERN)
    .messages({
      "string.min": AuthenticationMessages.PASSWORD_MIN,
      "string.empty": AuthenticationMessages.PASSWORD_MIN,
      "string.max": AuthenticationMessages.PASSWORD_MAX,
      "string.pattern.base": AuthenticationMessages.PASSWORD_PATTERN,
    }),
  repeatPassword: Joi.string().equal(Joi.ref("password")).messages({
    "any.only": AuthenticationMessages.PASSWORD_REPEAT,
  }),
});

export type SignUpForm = {
  email: string;
  password: string;
  repeatPassword: string;
};
