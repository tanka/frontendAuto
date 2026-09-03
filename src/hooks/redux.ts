// src/hooks/redux.ts

import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "@/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// useSelector is a hook from react-redux that lets you extract data from the Redux store state.
// TypedUseSelectorHook<RootState> is a TypeScript helper type from @reduxjs/toolkit.
// It creates a version of useSelector that already knows the shape of your store's state (RootState).
// By assigning useSelector to useAppSelector with this type, we avoid having to type the state parameter as
// RootState every time we use it.
