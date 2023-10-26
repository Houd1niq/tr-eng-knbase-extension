import React, { ReactNode, useMemo } from "react";
import { Provider } from "react-redux";
import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "../cofnig/StateSchema.ts";
import { createReduxStore } from "../cofnig/store.ts";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider: React.FC<StoreProviderProps> = (props) => {
  const { children, initialState } = props;
  const store = useMemo(() => createReduxStore(), [initialState]);

  return <Provider store={store}>{children}</Provider>;
};
