import { Fragment } from "react";

import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";

export default function AllEventsPage() {
  const events = getAllEvents();
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
