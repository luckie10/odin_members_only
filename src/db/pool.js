import pg from "pg";

export default new pg.Pool({
  host: "localhost",
  user: "luckie",
  database: "members_only",
  password: "12345",
  port: "5432",
});
