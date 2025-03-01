import { configureStore } from "@reduxjs/toolkit";
import { flightsApi } from "./services/flightAPI";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [flightsApi.reducerPath]: flightsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flightsApi.middleware),
});

setupListeners(store.dispatch);
