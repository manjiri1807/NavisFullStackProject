import { all, takeLatest, put } from 'redux-saga/effects';
import * as Actions from '@app/modules/actions';
import buildAction from '@app/util/buildAction';
import axios from 'axios';

function* fetchFeaturedMovies(action) {
  const response = yield axios.get('/api/movie/featured');
  yield put(buildAction(Actions.SET_FEATURED_MOVIES, response.data));
}


function* fetchMoviesDetails(action) {
  const response = yield axios.get('/api/movie/details?id=' + action.payload);
  yield put(buildAction(Actions.SET_MOVIE_DETAILS, response.data));
}

function* fetchSearchRecords(action) {
  try {
    const currentPage = action.payload.pagenumber ? action.payload.pagenumber : 1; //action.payload.pagenumber ? action.payload.pagenumber - 1 : action.payload.pagenumber
    const pagenumber = action.payload.pagenumber ? action.payload.pagenumber - 1 : action.payload.pagenumber
    const response = yield axios.get('/api/movie/search?title=' + action.payload.title + "&actor=" + action.payload.actor + "&genre=" + action.payload.genre + "&offset=" + pagenumber);
    debugger
    if (!response || !Object.entries(response.data).length) {
      yield put(buildAction(Actions.SET_SEARCH_ERROR, "No more movies available"));
    }
    const data = response.data;
    data.currentPage = currentPage;
    yield put(buildAction(Actions.SET_SEARCH_RECORDS, data));
  } catch (error) {
    yield put(buildAction(Actions.SET_SEARCH_ERROR, "No more movies available"));
  }
}


function* fetchGenres(action) {
  const response = yield axios.get('/api/movie/genre');
  yield put(buildAction(Actions.SET_MOVIE_GENRES, response.data));
}


export default function* watchAll() {
  yield all([
    takeLatest(Actions.FETCH_FEATURED_MOVIES, fetchFeaturedMovies),
    takeLatest(Actions.FETCH_MOVIE_DETAILS, fetchMoviesDetails),
    takeLatest(Actions.FETCH_SEARCH_RECORDS, fetchSearchRecords),
    takeLatest(Actions.FETCH_MOVIE_GENRES, fetchGenres),
  ]);
}
