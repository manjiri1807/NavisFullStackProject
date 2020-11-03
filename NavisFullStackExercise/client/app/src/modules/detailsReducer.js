import { handleActions } from 'redux-actions';
import * as Actions from './actions';

const initialState = {
    movieDetails: {actor : [], 
    genre: []},
};

const detailsReducer = handleActions(
  {
    [Actions.SET_MOVIE_DETAILS]: (state, action) => {
      state.movieDetails = action?.payload;
      return state;
    },
  },
  initialState
);

export default detailsReducer;