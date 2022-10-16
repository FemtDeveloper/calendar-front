import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNewEvent,
  FabDelete,
} from "../";
import { eventStyleGetter, getMessagesEs, localizer } from "../../helpers";
import { useCalendarStore, useUiStore } from "../../hooks";

const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const { events, active, setActiveEvent } = useCalendarStore();
  console.log(events, active);

  const { openDateModal } = useUiStore();

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    openDateModal();
  };
  const onSelect = (event) => {
    console.log({ Click: event });
    setActiveEvent(event);
  };
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNewEvent />
      <FabDelete />
    </>
  );
};

export default CalendarPage;
