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

export const updateUserById = async (id, column, value) => {
  try {
    const response = await pool.query(
      `UPDATE account SET ${column} = $1 WHERE id = $2 RETURNING *`,
      [value, id],
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const insertPost = async ({ title, body }, user_id) => {
  try {
    await pool.query(
      `INSERT INTO messages(title, body, user_id) VALUES($1, $2, $3)`,
      [title, body, user_id],
    );
  } catch (error) {
    console.error(error);
  }
};
