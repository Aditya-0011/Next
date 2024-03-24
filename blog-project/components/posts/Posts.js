import PostsGrid from "./PostsGrid";

import classes from "./Posts.module.css";

export default function Posts(props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}
