import * as Yup from "yup";
import { ValidationMessages } from "../messages";
import { ValidationRules } from "../rules";

export const authSignUpScheme = Yup.object({
  name: Yup.string()
  .min(2)
  .max(20)
  .required(),
  surname: Yup.string()
  .min(2)
  .max(40)
  .required(),
  email: Yup.string()
    .email()
    .max(255)
    .required(ValidationMessages.EMAIL_REQUIRED),
  password: Yup.string()
    .min(8)
    .max(32)
    .required(ValidationMessages.PASSWORD_REQUIRED)
    .matches(ValidationRules.PASSWORD, ValidationMessages.PASSWORD_REGEX),
  passwordConfirmation: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      ValidationMessages.CONFIRMATION_PASSWORD_MUST_MUCH
    )
    .required(ValidationMessages.CONFIRMATION_PASSWORD_REQUIRED),
});

export const authSignInScheme = Yup.object({
  email: Yup.string()
    .email()
    .max(255)
    .required(ValidationMessages.EMAIL_REQUIRED),
  password: Yup.string()
    .min(8)
    .max(32)
    .required(ValidationMessages.PASSWORD_REQUIRED),
});
