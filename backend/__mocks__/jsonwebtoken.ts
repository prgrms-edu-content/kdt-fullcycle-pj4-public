import { jest } from "@jest/globals";

const jwt = {
  // 주어진 email 앞에 "mock_jwt_"를 붙여서 반환하도록 모킹
  sign: jest.fn(({ email }: { email: string }) => "mock_jwt_" + email),

  // 주어진 token이 "mock_jwt_"로 시작하지 않으면 에러를 던지도록 모킹
  verify: jest.fn((token: string) => {
    if (!token.startsWith("mock_jwt_")) {
      throw new Error("Invalid token");
    }
  }),

  // 주어진 token에서 "mock_jwt_"를 제거한 문자열을 email로 반환하도록 모킹
  decode: jest.fn((token: string) => {
    if (!token.startsWith("mock_jwt_")) {
      throw new Error("Invalid token");
    }
    return { email: token.replace("mock_jwt_", "") };
  }),
};

export default jwt;
