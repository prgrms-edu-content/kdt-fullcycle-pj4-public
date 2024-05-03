export class User {
  constructor(public readonly id: number, public email: string, public encryptedPassword: string) {}

  static async findOne(params: { email: string }) {
    return MOCK_USERS.find((user) => user.email === params.email) || null;
  }

  static async create(params: { email: string; password: string }) {
    if (MOCK_USERS.find(({ email }) => email === params.email)) {
      throw Object.assign(new Error(), {
        code: "ER_DUP_ENTRY",
      });
    }

    const encryptedPassword = "mock_encrypted_" + params.password;
    const id = Math.max(0, ...MOCK_USERS.map(({ id }) => id)) + 1;
    const user = new User(id, params.email, encryptedPassword);
    MOCK_USERS.push(user);
    return user;
  }

  verifyPassword(password: string) {
    return this.encryptedPassword === "mock_encrypted_" + password;
  }
}

export const MOCK_USERS: User[] = [];
