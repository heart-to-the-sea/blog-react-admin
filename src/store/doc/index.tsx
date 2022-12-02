import { createSlice } from "@reduxjs/toolkit";
import { TDoc } from "../../app.url";
interface InitialState {
  doc: Partial<TDoc>;
}
const initialState: InitialState = {
  doc: {},
};
const counterSlice = createSlice({
  name: "doc",
  initialState,
  reducers: {
    setDoc(state: InitialState, data) {
      state.doc = data.payload;
    },
  },
});

export const { setDoc } = counterSlice.actions;
export default counterSlice.reducer;
