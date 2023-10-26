import { TrEnglishApi } from "../../../../shared/api/TREnglishApi.ts";

export type KnowledgeBaseItem = {
  itemId: number;
  correctCounter: number;
  wrongCounter: number;
  engWord: string;
  rusWord: string;
};

export const addTaskApiSlice = TrEnglishApi.injectEndpoints({
  endpoints: (build) => ({
    addToKnowledgeBase: build.mutation<
      void,
      { rusWord: string; engWord: string }
    >({
      query: (body) => ({
        url: "knowledge-base/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["KnowledgeBase"],
    }),
  }),
});
