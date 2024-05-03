import { DB_HOST, DB_PORT, DB_USER, DB_PASSWD, DB_NAME } from "../settings";

import mysql, { QueryError } from "mysql2/promise";

export const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWD,
    database: DB_NAME,
    multipleStatements: true
});

export const isQueryError = (error: unknown): error is QueryError => {
  if (error instanceof Error === false) {
    return false;
  }
  return typeof (error as QueryError).code === "string";
}
