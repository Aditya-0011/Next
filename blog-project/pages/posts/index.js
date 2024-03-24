import Head from "next/head";

import Posts from "../../components/posts/Posts";
import { AllPosts } from "../../util/Posts";

export default function PostsPage(props) {
  return (
    <>
      <Head>
        <title>All Blogs</title>
        <meta
          name="description"
          content="Blogs related to programming and web development."
        />
      </Head>
      <Posts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const posts = AllPosts();
  return {
    props: {
      posts: posts,
    },
    revalidate: 1800,
  };
}
