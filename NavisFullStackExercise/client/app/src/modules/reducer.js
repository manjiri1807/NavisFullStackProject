import { handleActions } from 'redux-actions';
import * as Actions from './actions';

const initialState = {
  featuredMovies: [],
};

const reducer = handleActions(
  {
    [Actions.SET_FEATURED_MOVIES]: (state, action) => {
      state.featuredMovies = action?.payload;
      return state;
    },
  },
  initialState
);

export default reducer;
