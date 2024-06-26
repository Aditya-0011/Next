import { Fragment, useContext } from "react";

import MainHeader from "./MainHeader";

import Notification from "../ui/notification";
import NotificationContext from "../../store/NotificationContext";

export default function Layout(props) {
  const notificationContext = useContext(NotificationContext);
  const activeNotification = notificationContext.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}
