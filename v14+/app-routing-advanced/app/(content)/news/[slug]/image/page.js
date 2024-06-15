import { notFound } from "next/navigation";

import { getNewsItem } from "@/lib/news";

export default async function ImagePage({ params }) {
  const newsSlug = params.slug;

  const news = await getNewsItem(newsSlug);

  if (!news) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${news.image}`} alt={news.title} />
    </div>
  );
}
