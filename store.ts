import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import registrationEmailSliceReducer from "./slices/registrationEmailSlice";

/*export const store = configureStore({
  reducer: {
    registrationEmail: registrationEmailSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
*/

import { registrationEmailSlice } from "./slices/registrationEmailSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [registrationEmailSlice.name]: registrationEmailSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
