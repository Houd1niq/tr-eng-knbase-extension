import { TrEnglishApi } from "../../../../shared/api/TREnglishApi.ts";

export type User = {
  name: string;
  login: string;
  role: "teacher" | "student";
  tasks?: { name: string; createdAt: string; hash: string }[];
};

export const userApiSlice = TrEnglishApi.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<User, void>({
      query: () => ({
        url: "user/info",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});
