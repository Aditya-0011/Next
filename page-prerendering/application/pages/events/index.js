import { Fragment } from "react";

import { useRouter } from "next/router";

import { getAllEvents } from "../../helpers/api-fetch";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

export default function AllEventsPage(props) {
  const { events } = props;
  const router = useRouter();

  async function findEventsHandler(year, month) {
    const path = `/events/${year}/${month}`;
    await router.push(path);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: { events: events },
    revalidate: 60,
  };
}
