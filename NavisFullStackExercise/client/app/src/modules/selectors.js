import { createSelector } from 'reselect';

const app = state => state.app;
const details = state => state.details;
const search = state => state.search;

const genres = state => state.genres;

export const selectFeaturedMovies = createSelector(app, app => app.featuredMovies);
export const selectMovieDetails = createSelector(details, details => details.movieDetails);
export const selectMovieSearch = createSelector(search, search => search.records.content);
export const selectMovieSearchCurrentPage = createSelector(search, search => search.records.currentPage);
export const selectTotalPagesCount = createSelector(search, search => search.records.totalPages);
export const selectSearchError = createSelector(search, search => search.error);

export const selectGenreSearch = createSelector(genres, genres => genres.movieGenres)