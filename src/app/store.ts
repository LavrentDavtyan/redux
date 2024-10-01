import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { reducer } from "../features/tasks/tasks.slice"
import { IState } from "../features/tasks/types"

export type RootState = IState

export const store = configureStore({
    reducer: reducer,
})

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
