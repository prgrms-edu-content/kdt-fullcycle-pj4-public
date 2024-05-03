import bcrypt from "bcrypt";
import { pool } from "../utils/mysql";
import { RowDataPacket } from "mysql2";

export class User {
  private constructor(
    public readonly id: number,
    public email: string,
    public encryptedPassword: string
  ) {}

  static async findOne(params: { email: string }) {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, email, encrypted_password FROM users WHERE email = ?",
      [params.email]
    );
    if (rows.length === 0) {
      return null;
    }
    const [row] = rows;
    return new User(row.id, row.email, row.encrypted_password);
  }

  static async create(params: { email: string; password: string }) {
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(params.password, saltRounds);

    const [rows] = await pool.query<RowDataPacket[]>(
      "INSERT INTO users (email, encrypted_password) VALUES (?, ?) RETURNING *",
      [params.email, encryptedPassword]
    );
    const [row] = rows;
    return new User(row.id, row.email, row.encrypted_password);
  }

  async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.encryptedPassword);
  }
}
