import { createSlice } from "@reduxjs/toolkit";
import { events } from "../../data/events";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
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
    onUpdateEvent: (state, action) => {
      state.events = state.events.map((event) => {
        if (event._id === action.payload._id) {
          return action.payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.active) {
        state.events = state.events.filter(
          (event) => event._id !== state.active._id
        );
        state.active = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
