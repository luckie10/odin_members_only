import { getAllPosts } from "../db/queries.js";

export const index_get = async (req, res, next) => {
  const posts = await getAllPosts();
  console.log(posts);
  res.render("index", { posts });
};
