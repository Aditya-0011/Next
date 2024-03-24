import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postDir = path.join(process.cwd(), "content", "posts");

export function getFiles() {
  return fs.readdirSync(postDir);
}

export function getData(file) {
  const postSlug = file.replace(/\.md$/, "");
  const filePath = path.join(postDir, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: postSlug,
    ...data,
    content,
  };
}
export function AllPosts() {
  const files = getFiles();

  const posts = files.map((file) => getData(file));

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getFeaturedPosts() {
  const posts = AllPosts();
  return posts.filter((post) => post.isFeatured);
}
