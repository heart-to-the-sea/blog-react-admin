import { configureStore } from "@reduxjs/toolkit";
import global from "./global";
import doc from "./doc";
const store = configureStore({
  reducer: {
    global,
    doc,
  },
});
// state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
