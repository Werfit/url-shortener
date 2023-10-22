export const AuthenticationMessages = {
  EMAIL_NOT_EMPTY: "Email must not be empty",
  EMAIL_PATTERN: "Incorrect email format",

  PASSWORD_MIN: "Password must contain at least 8 characters",
  PASSWORD_MAX: "Password must contain less than 16 characters",
  PASSWORD_PATTERN:
    "Password must have 1 uppercase letter, 1 lowercase, 1 number or special character",

  PASSWORD_REPEAT: "Password mismatch",
};

export const AuthenticationRules = {
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 16,
  // https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
  PASSWORD_PATTERN: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,

  // https://gist.github.com/Robert-Schwartz/8ddac9ad8be545a8997433faed18dfaf
  EMAIL_PATTERN: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
};
