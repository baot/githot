import { ghTrendSearch } from './lib';

export const REQUEST_HOT_GHREPOS = 'REQUEST_HOT_GHREPOS';
export const RECEIVE_HOT_GHREPOS = 'RECEIVE_HOT_GHREPOS';
export const ERROR_RECEIVE_HOT_GHREPOS = 'ERROR_RECEIVE_HOT_GHREPOS';
export const RESET_HOT_GHREPOS = 'RESET_HOT_GHREPOS';

function requestHotGhRepos(options) {
  return {
    type: REQUEST_HOT_GHREPOS,
    options,
  };
}

function receiveHotGhRepos(repos) {
  return {
    type: RECEIVE_HOT_GHREPOS,
    repos,
  };
}

function receiveErrorHotGhRepos(error) {
  return {
    type: ERROR_RECEIVE_HOT_GHREPOS,
    error,
  };
}

export function resetHotGhRepos(repos) {
  return {
    type: RESET_HOT_GHREPOS,
  };
}

export function fetchHotGhRepos(options) {
  return function fetchReposThunk(dispatch) {
    dispatch(requestHotGhRepos(options));

    ghTrendSearch(options).fork(
      err => dispatch(receiveErrorHotGhRepos(err)),
      repos => dispatch(receiveHotGhRepos(repos))
    );
  };
}
