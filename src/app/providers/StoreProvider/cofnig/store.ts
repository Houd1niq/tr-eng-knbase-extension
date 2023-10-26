import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { AuthReducer } from "../../../../features/checkAuth";
import { TrEnglishApi } from "../../../../shared/api/TREnglishApi.ts";
import { translationApi } from "../../../../shared/api/translationApi.ts";

const rootReducer: ReducersMapObject<StateSchema> = {
  auth: AuthReducer,
  [TrEnglishApi.reducerPath]: TrEnglishApi.reducer,
  [translationApi.reducerPath]: translationApi.reducer,
};

export function createReduxStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        TrEnglishApi.middleware,
        translationApi.middleware
      );
    },
  });
}
