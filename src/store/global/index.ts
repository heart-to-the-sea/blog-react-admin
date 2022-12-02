import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  type: number;
}
const initialState: InitialState = {
  type: 0,
};
const counterSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const {} = counterSlice.actions;
export default counterSlice.reducer;
