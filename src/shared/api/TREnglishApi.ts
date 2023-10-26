import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { StateSchema } from "../../app/providers/StoreProvider";
import { logOut, setAccessToken } from "../../features/checkAuth";
import { refreshResponse } from "../../features/checkAuth/models/types";

const baseUrl = "https://tr-eng.vercel.app";
// const baseUrl = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as StateSchema;
    const token = state.auth.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReFetch: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // if (result.error && result.error.status === "FETCH_ERROR") {}

  if (result.error && result.error.status === 401) {
    const refreshResult = (await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    )) as refreshResponse;
    if (refreshResult.data && refreshResult.data.accessToken) {
      api.dispatch(setAccessToken(refreshResult.data.accessToken));
    } else if (refreshResult.error) {
      api.dispatch(logOut());
    }
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

export const TrEnglishApi = createApi({
  reducerPath: "trEnglishApi",
  baseQuery: baseQueryWithReFetch,
  tagTypes: ["StudentTask", "User", "KnowledgeBase"],
  endpoints: () => ({}),
});
