import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface RegistrationEmailState {
  value: string;
}

const initialState: RegistrationEmailState = {
  value: "",
};

export const registrationEmailSlice = createSlice({
  name: "registrationEmail",
  initialState,
  reducers: {
    removeEmail: (state) => {
      state.value = "";
    },
    addEmail: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { addEmail, removeEmail } = registrationEmailSlice.actions;

export default registrationEmailSlice.reducer;
