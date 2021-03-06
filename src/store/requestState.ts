import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IReduxState, IRequestProps, AppThunk } from "./store.types";

interface IRequestStateItem extends IRequestProps {
    name: string;
}

export interface IRequestStateRedux {
    list: IRequestStateItem[],
}

const initialState: IRequestStateRedux = {
    list: []
}

export const requestStateSlice = createSlice({
    name: "requestState",
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<IRequestStateItem>) => {
            state.list = [
                ...state.list.filter( (item) => item.name !== action.payload.name ),
                action.payload
            ]
        },
        reset: (state, action: PayloadAction<IRequestStateItem["name"]>) => {
            state.list = state.list.filter( (item) => item.name !== action.payload)
        }
    }
})

export default requestStateSlice.reducer;



export const addRequestState = (item: IRequestStateItem): AppThunk => (dispatch) => {
    dispatch(requestStateSlice.actions.setState(item));
}

/**
 * Selector that returns a list of request/method states
 */
export const requestListSelector = createSelector(
    (state: IReduxState) => state.requestState,
    (requestState) => requestState.list
  );

/**
 * Generates a selector for getting the current state of a request/method
 */
export const generateRequestStateSelectors = (requestName: IRequestStateItem["name"]) => {
    const requestSelector = createSelector(requestListSelector, (requestList) => requestList.find( (i) => i.name === requestName))
    return {
        isInitial: createSelector(
          requestSelector,
          (request) => request?.state === "INITIAL"
        ),
        isLoading: createSelector(
          requestSelector,
          (request) => request?.state === "LOADING"
        ),
        isComplete: createSelector(
          requestSelector,
          (request) => request?.state === "COMPLETE"
        ),
        error: createSelector(requestSelector, (request) => request?.error),
      };
}