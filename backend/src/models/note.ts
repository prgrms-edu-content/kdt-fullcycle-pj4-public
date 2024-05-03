import { pool } from "../utils/mysql";
import { RowDataPacket } from "mysql2";

export class Note {
  private constructor(
    public readonly id: number,
    public title: string,
    public content?: string,
    public userId?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  static async findAll(params: { userId: number }) {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, title, created_at, updated_at FROM notes WHERE user_id = ? ORDER BY created_at DESC",
      [params.userId]
    );
    return rows.map(
      (row) => new Note(row.id, row.title, undefined, undefined, row.created_at, row.updated_at)
    );
  }

  static async findOne(params: { id: number }) {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, title, content, user_id, created_at, updated_at FROM notes WHERE id = ?",
      [params.id]
    );
    if (rows.length === 0) {
      return null;
    }
    const [row] = rows;
    return new Note(row.id, row.title, row.content, row.user_id, row.created_at, row.updated_at);
  }

  static async create(params: { title: string; content: string; userId: number }) {
    const [rows] = await pool.query<RowDataPacket[]>(
      "INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?) RETURNING *",
      [params.title, params.content, params.userId]
    );
    const [row] = rows;
    return new Note(row.id, row.title, row.content, row.user_id, row.created_at, row.updated_at);
  }

  async update(params: { title: string; content: string; userId: number }) {
    await pool.query("UPDATE notes SET title = ?, content = ?, user_id = ? WHERE id = ?", [
      params.title,
      params.content,
      params.userId,
      this.id,
    ]);
    this.title = params.title;
    this.content = params.content;
    this.userId = params.userId;
  }

  async delete() {
    await pool.query("DELETE FROM notes WHERE id = ?", [this.id]);
  }
}
