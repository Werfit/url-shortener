import jwtDecode from "jwt-decode";

type DefaultTokenData = {
  iat: number;
  exp: number;
};

class JwtDecoder {
  decode<ExpectedData>(token: string): ExpectedData & DefaultTokenData {
    return jwtDecode(token);
  }
}

const jwtDecoder = new JwtDecoder();
export default jwtDecoder;
