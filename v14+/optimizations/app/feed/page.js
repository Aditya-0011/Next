import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";

export async function generateMetadata(config) {
  const posts = await getPosts();
  const numPosts = posts.length;
  return {
    title: `Browse all our ${numPosts} posts`,
    description: `Browse all our ${numPosts} posts`,
  };
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
