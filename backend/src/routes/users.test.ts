import request from "supertest";
import { app } from "../app";
import { User, MOCK_USERS } from "../models/__mocks__/user";

jest.mock("../models/user", () => jest.requireActual("../models/__mocks__/user"));

afterEach(() => {
  MOCK_USERS.splice(0, MOCK_USERS.length);
});

describe("POST /login", () => {
  test("올바른 이메일과 비밀번호를 입력하면 JWT 쿠키가 설정되고 204 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_apple123"));

    const response = await request(app).post("/login").send({
      email: "apple@example.com",
      password: "apple123",
    });

    expect(response.headers["set-cookie"][0]).toMatch(/^access-token=mock_jwt_/);
    expect(response.status).toBe(204);
  });

  test("잘못된 비밀번호를 입력하면 401 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_apple123"));

    const response = await request(app).post("/login").send({
      email: "apple@example.com",
      password: "wrong_password",
    });

    expect(response.status).toBe(401);
  });

  test("잘못된 이메일을 입력하면 401 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_apple123"));

    const response = await request(app).post("/login").send({
      email: "wrong_email@example.com",
      password: "apple123",
    });

    expect(response.status).toBe(401);
  });
});

describe("POST /logout", () => {
  test("204 응답을 받는다.", async () => {
    const response = await request(app).post("/logout");

    expect(response.status).toBe(204);
  });

  test("JWT 쿠키가 제거된다.", async () => {
    const response = await request(app).post("/logout");

    expect(response.headers["set-cookie"][0]).toMatch(/^access-token=;/);
  });
});

describe("GET /users/me", () => {
  test("올바른 JWT 쿠키가 설정되어있으면 유저 정보와 함께 200 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_apple123"));

    const response = await request(app)
      .get("/users/me")
      .set("Cookie", "access-token=mock_jwt_apple@example.com");

    expect(response.body).toEqual({ email: "apple@example.com" });
    expect(response.status).toBe(200);
  });

  test("존재하지 않는 유저에 대한 JWT 쿠키가 설정되어있으면 401 응답을 받는다.", async () => {
    const response = await request(app)
      .get("/users/me")
      .set("Cookie", "access-token=mock_jwt_not_existing@example.com");

    expect(response.status).toBe(401);
  });

  test("JWT 쿠키가 없으면 401 응답을 받는다.", async () => {
    const response = await request(app).get("/users/me");

    expect(response.status).toBe(401);
  });
});

describe("POST /users", () => {
  test("주어진 정보로 회원가입 후 201 응답을 받는다.", async () => {
    const response = await request(app).post("/users").send({
      email: "new@example.com",
      password: "new123",
    });

    expect(response.status).toBe(201);
  });

  test("회원가입한 정보가 DB에 저장된다.", async () => {
    await request(app).post("/users").send({
      email: "new2@example.com",
      password: "new123",
    });

    expect(MOCK_USERS.find(({ email }) => email === "new2@example.com")).not.toBeUndefined();
  });

  test("이미 존재하는 이메일로 회원가입하려고하면 409 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_apple123"));

    const response = await request(app).post("/users").send({
      email: "apple@example.com",
      password: "overriding_apple123",
    });

    expect(response.status).toBe(409);
  });
});
