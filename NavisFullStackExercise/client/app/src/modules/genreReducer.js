import { handleActions } from 'redux-actions';
import * as Actions from './actions';

const initialState = {
  movieGenres: [],
};

const genreReducer = handleActions(
  {
    [Actions.SET_MOVIE_GENRES]: (state, action) => {
      state.movieGenres = action?.payload;
      return state;
    },
  },
  initialState
);

export default genreReducer;
