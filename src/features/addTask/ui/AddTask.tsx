import React, { useCallback, useEffect, useState } from "react";
import { translationApi } from "../../../shared/api/translationApi";
import { debounce } from "../../../shared/lib/debounce";
import { addTaskApiSlice } from "../models/services/addTaskApi";
import WordsInput from "../../../shared/ui/WordsInput";
import { CommonButton } from "../../../shared/ui/CommonButton";

export const AddTask: React.FC = () => {
  const [rusValue, setRusValue] = useState("");
  const [engValue, setEngValue] = useState("");

  const [getTranslation, translationResponse] =
    translationApi.useLazyGetTranslationQuery();

  const [addTaskTrigger, addTaskResponse] =
    addTaskApiSlice.useAddToKnowledgeBaseMutation();

  console.log(translationResponse);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTaskTrigger({
      rusWord: rusValue,
      engWord: engValue,
    });
  };

  useEffect(() => {
    console.log(addTaskTrigger);
  }, [addTaskResponse]);

  const debouncedGetTranslation = useCallback(
    debounce(getTranslation, 1000),
    []
  );

  return (
    <form className="flex gap-3 flex-col" onSubmit={submitHandler}>
      <div className="">
        <WordsInput
          placeholder="Table"
          label="Слово на анлийском"
          value={engValue}
          getValue={(value) => {
            setEngValue(value);
            debouncedGetTranslation(value);
          }}
          name="engWord"
        />
      </div>
      <div>
        <WordsInput
          placeholder="Стол"
          label="Перевод на русском"
          value={rusValue}
          getValue={(value) => {
            setRusValue(value);
          }}
          name="rusWord"
        />
      </div>
      <CommonButton type="submit">Добавить</CommonButton>
    </form>
  );
};
