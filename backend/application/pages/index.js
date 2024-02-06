import Head from "next/head";

import { getFeaturedEvents } from "../helpers/api-fetch";
import EventList from "../components/events/EventList";
import NewsLetterRegistration from "../components/input/newsLetterRegistration";

export default function Homepage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsLetterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
