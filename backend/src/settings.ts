import dotenv from "dotenv";

dotenv.config();
export const PORT = process.env.PORT || 3031;
export const CORS_ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const DB_HOST = process.env.DB_HOST || "";
export const DB_PORT = parseInt(process.env.DB_PORT || "3306");
export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWD = process.env.DB_PASSWD || "";
export const DB_NAME = process.env.DB_NAME || "";
