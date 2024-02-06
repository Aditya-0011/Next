import { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import useSWR from "swr";

import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEventsPage() {
  const [events, setEvents] = useState();

  const router = useRouter();

  const filteredData = router.query.eventSlug;

  const { data, error } = useSWR(
    "https://nextjs-1b1e9-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setEvents(events);
    }
  }, [data]);

  if (!events) {
    return (
      <Fragment>
        <Head>
          <title>Loading</title>
          <meta name="description" content="Loading..." />
        </Head>
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filteredYear = +filteredData[0];
  const filteredMonth = +filteredData[1];

  const pageHeader = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${filteredMonth}/${filteredYear}`}
      />
    </Head>
  );

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2027 ||
    filteredYear < 2022 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeader}
        <ErrorAlert>
          <p className="center">Invalid Filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeader}
        <ErrorAlert>
          <p className="center">No events founds</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {pageHeader}
      {/*<ResultsTitle date={new Date(props.date.year, props.date.month - 1)} />*/}
      <ResultsTitle date={new Date(filteredYear, filteredMonth - 1)} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//
//   const filteredData = params.eventSlug;
//   const filteredYear = +filteredData[0];
//   const filteredMonth = +filteredData[1];
//
//   if (
//     isNaN(filteredYear) ||
//     isNaN(filteredMonth) ||
//     filteredYear > 2027 ||
//     filteredYear < 2022 ||
//     filteredMonth < 1 ||
//     filteredMonth > 12
//   ) {
//     return { props: { hasError: true } };
//   }
//
//   const filteredEvents = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth,
//   });
//
//   return {
//     props: {
//       events: filteredEvents,
//       date: { year: filteredYear, month: filteredMonth },
//     },
//   };
// }
