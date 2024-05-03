import request from "supertest";
import { app } from "../app";
import { User, MOCK_USERS } from "../models/__mocks__/user";
import { Note, MOCK_NOTES } from "../models/__mocks__/note";

jest.mock("../models/user", () => jest.requireActual("../models/__mocks__/user"));
jest.mock("../models/note", () => jest.requireActual("../models/__mocks__/note"));

afterEach(() => {
  MOCK_USERS.splice(0, MOCK_USERS.length);
  MOCK_NOTES.splice(0, MOCK_NOTES.length);
});

describe("GET /notes", () => {
  test("자신이 작성한 노트 목록과 함께 200 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(
      new Note(1, "사과의 노트", "사과의 노트 내용", 1),
      new Note(2, "사과주스 레시피", "사과주스 레시피 내용", 1),
      new Note(2, "바나나주스 레시피", "바나나주스 레시피 내용", 2)
    );

    const response = await request(app)
      .get("/notes")
      .set("Cookie", "access-token=mock_jwt_apple@example.com");

    expect(response.body).toEqual([
      {
        id: 1,
        title: "사과의 노트",
      },
      {
        id: 2,
        title: "사과주스 레시피",
      },
    ]);
    expect(response.status).toBe(200);
  });

  test("자신이 작성한 노트 목록이 없으면 빈 배열과 함께 200 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(2, "banana@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(
      new Note(1, "사과의 노트", "사과의 노트 내용", 1),
      new Note(2, "사과주스 레시피", "사과주스 레시피 내용", 1)
    );

    const response = await request(app)
      .get("/notes")
      .set("Cookie", "access-token=mock_jwt_banana@example.com");

    expect(response.body).toEqual([]);
    expect(response.status).toBe(200);
  });

  test("로그인하지 않았으면 401 응답을 받는다.", async () => {
    const response = await request(app).get("/notes");

    expect(response.status).toBe(401);
  });
});

describe("GET /notes/:id", () => {
  test("작성한 노트와 함께 200 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    const response = await request(app)
      .get("/notes/1")
      .set("Cookie", "access-token=mock_jwt_apple@example.com");

    expect(response.body).toEqual({
      id: 1,
      title: "사과의 노트",
      content: "사과의 노트 내용",
      userId: 1,
    });
    expect(response.status).toBe(200);
  });

  test("존재하지 않는 노트면 404 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    const response = await request(app)
      .get("/notes/123")
      .set("Cookie", "access-token=mock_jwt_apple@example.com");

    expect(response.status).toBe(404);
  });

  test("다른 사용자의 노트면 403 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(2, "banana@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    const response = await request(app)
      .get("/notes/1")
      .set("Cookie", "access-token=mock_jwt_banana@example.com");

    expect(response.status).toBe(403);
  });
});

describe("POST /notes", () => {
  test("노트를 작성하고 노트 정보와 함께 201 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));

    const response = await request(app)
      .post("/notes")
      .set("Cookie", "access-token=mock_jwt_apple@example.com")
      .send({
        title: "사과의 노트",
        content: "사과의 노트 내용",
      });

    expect(response.body).toEqual({
      id: 1,
      title: "사과의 노트",
      content: "사과의 노트 내용",
      userId: 1,
    });
    expect(response.status).toBe(201);
  });

  test("작성한 노트는 DB에 저장된다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));

    await request(app)
      .post("/notes")
      .set("Cookie", "access-token=mock_jwt_apple@example.com")
      .send({
        title: "새 사과 노트",
        content: "사과 노트 내용",
      });

    expect(MOCK_NOTES[0]).toEqual({
      id: 1,
      title: "새 사과 노트",
      content: "사과 노트 내용",
      userId: 1,
    });
  });
});

describe("PUT /notes/:id", () => {
  test("노트를 수정하고 노트 정보와 함께 200 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    const response = await request(app)
      .put("/notes/1")
      .set("Cookie", "access-token=mock_jwt_apple@example.com")
      .send({
        title: "사과의 노트 수정",
        content: "사과의 노트 내용 수정",
      });

    expect(response.body).toEqual({
      id: 1,
      title: "사과의 노트 수정",
      content: "사과의 노트 내용 수정",
      userId: 1,
    });
    expect(response.status).toBe(200);
  });

  test("노트를 수정하면 DB에 반영된다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    await request(app)
      .put("/notes/1")
      .set("Cookie", "access-token=mock_jwt_apple@example.com")
      .send({
        title: "사과의 노트 수정",
        content: "사과의 노트 내용 수정",
      });

    expect(MOCK_NOTES[0]).toEqual({
      id: 1,
      title: "사과의 노트 수정",
      content: "사과의 노트 내용 수정",
      userId: 1,
    });
  });

  test("빈 제목으로도 업데이트할 수 있다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    const response = await request(app)
      .put("/notes/1")
      .set("Cookie", "access-token=mock_jwt_apple@example.com")
      .send({
        title: "",
        content: "사과의 노트 내용 수정",
      });

    expect(response.body).toEqual({
      id: 1,
      title: "",
      content: "사과의 노트 내용 수정",
      userId: 1,
    });
    expect(response.status).toBe(200);
  });

  test("존재하지 않는 노트면 404 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    const response = await request(app)
      .put("/notes/123")
      .set("Cookie", "access-token=mock_jwt_apple@example.com")
      .send({
        title: "수정한 제목",
        content: "수정한 내용",
      });

    expect(response.status).toBe(404);
  });

  test("다른 사용자의 노트면 DB가 수정되지 않고 403 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(2, "banana@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    const response = await request(app)
      .put("/notes/1")
      .set("Cookie", "access-token=mock_jwt_banana@example.com")
      .send({
        title: "수정한 제목",
        content: "수정한 내용",
      });

    expect(MOCK_NOTES[0]).toEqual({
      id: 1,
      title: "사과의 노트",
      content: "사과의 노트 내용",
      userId: 1,
    });
    expect(response.status).toBe(403);
  });
});

describe("DELETE /notes/:id", () => {
  it("DB에서 노트가 삭제되고 204 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    const response = await request(app)
      .delete("/notes/1")
      .set("Cookie", "access-token=mock_jwt_apple@example.com");

    expect(MOCK_NOTES.length).toBe(0);
    expect(response.status).toBe(204);
  });

  it("존재하지 않는 노트면 404 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    const response = await request(app)
      .delete("/notes/123")
      .set("Cookie", "access-token=mock_jwt_apple@example.com");

    expect(response.status).toBe(404);
  });

  it("다른 사용자의 노트면 DB가 수정되지 않고 403 응답을 받는다.", async () => {
    MOCK_USERS.push(new User(2, "banana@example.com", "mock_encrypted_"));
    MOCK_NOTES.push(new Note(1, "사과의 노트", "사과의 노트 내용", 1));

    const response = await request(app)
      .delete("/notes/1")
      .set("Cookie", "access-token=mock_jwt_banana@example.com");

    expect(MOCK_NOTES.length).toBe(1);
    expect(response.status).toBe(403);
  });
});
