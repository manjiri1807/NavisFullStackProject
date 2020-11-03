import { handleActions } from "redux-actions";
import * as Actions from './actions';
const initialState = {
    records:{ content: [], totalPages: null },
    error:null
}

const search_reducer = handleActions(
    {
        [Actions.SET_SEARCH_RECORDS]: (state, action) => {
            state.records = action?.payload;
            state.totalPages = action?.payload.totalPages;
            return state;
        },
        [Actions.SET_SEARCH_ERROR]: (state,action) => {
            state.error = action?.payload;
            return state;
        }

    },
    initialState
)

export default search_reducer;