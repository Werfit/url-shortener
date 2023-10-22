import { Callback } from "aws-lambda";
import jwtDecode from "jwt-decode";

export const authorize = async (event, _, callback: Callback) => {
  const authorization =
    event.headers["Authorization"] ?? event.headers.authorization;
  const token = authorization.split(" ")[1];

  if (!token) {
    return callback("Unauthorized");
  }

  const { email } = jwtDecode(token) as { email: string };
  return {
    ...generatePolicy("user", "Allow", "*"),
    context: { email },
  };
};

const generatePolicy = function (principalId, effect, resource) {
  const authResponse = {
    principalId,
    policyDocument: undefined,
  };

  if (effect && resource) {
    authResponse.policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    };
  }

  return authResponse;
};
