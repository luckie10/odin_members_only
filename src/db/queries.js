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

export const getUserByUsername = async (username) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM account WHERE username = $1",
      [username],
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (id) => {
  try {
    const { rows } = await pool.query("SELECT * FROM account WHERE id = $1", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
};
