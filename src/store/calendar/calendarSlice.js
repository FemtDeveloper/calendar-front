import { createSlice } from "@reduxjs/toolkit";
import { events } from "../../data/events";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: events,
    active: null,
  },
  reducers: {
    onSetActiveEvent: (state, action) => {
      state.active = action.payload;
    },
    onAddNewEvent: (state, action) => {
      state.events.push(action.payload);
      state.active = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.active) {
        state.events = state.events.filter(
          (event) => event.id !== state.active.id
        );
        state.active = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // state.events= payload
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.events = [];
      state.isLoadingEvents = false;
      state.active = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
