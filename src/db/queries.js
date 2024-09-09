import { default as pool } from "./pool.js";

export const insertUser = async (user) => {
  const { firstName, lastName, username, password } = user;
  try {
    await pool.query(
      `INSERT INTO account(first_name, last_name, username, password)
    VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, username, password],
    );
  } catch (error) {
    console.log(error);
  }
};

