import NewsList from "@/components/NewsList";

import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}

//Server side rendering

// import NewsList from "@/components/NewsList";
//
// export default async function NewsPage() {
//   const response = await fetch("http://localhost:8080/news");
//
//   if (!response.ok) {
//     throw new Error("Failed to fetch news");
//   }
//
//   const news = await response.json();
//
//   return (
//     <>
//       <h1>News Page</h1>
//       <NewsList news={news} />
//     </>
//   );
// }

//Client side rendering

// "use client";
//
// import { useState, useEffect } from "react";
//
// import NewsList from "@/components/NewsList";
//
// export default function NewsPage() {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//
//   useEffect(() => {
//     async function fetchNews() {
//       setLoading(true);
//       const response = await fetch("http://localhost:8080/news");
//
//       if (!response.ok) {
//         setError("Failed to fetch news");
//         setLoading(false);
//       }
//
//       const data = await response.json();
//       setLoading(false);
//       setNews(data);
//     }
//
//     fetchNews();
//   }, []);
//
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//
//   if (error) {
//     return <p>{error}</p>;
//   }
//
//   return (
//       <>
//         <h1>News Page</h1>
//         {news && news.length > 0 && <NewsList news={news} />}
//       </>
//   );
// }
