import { notFound } from "next/navigation";

import ModalBackdrop from "@/components/ModalBackdrop";

import { getNewsItem } from "@/lib/news";

export default async function InterceptedImagePage({ params }) {
  const newsSlug = params.slug;

  const news = await getNewsItem(newsSlug);

  if (!news) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${news.image}`} alt={news.title} />
        </div>
      </dialog>
    </>
  );
}
