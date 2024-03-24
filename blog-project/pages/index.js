import Head from "next/head";

import Hero from "../components/home/Hero";
import FeaturedPosts from "../components/home/FeaturedPosts";

import { getFeaturedPosts } from "../util/Posts";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="Blogs related to programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 1800,
  };
}
