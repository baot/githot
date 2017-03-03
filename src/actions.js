import { ghTrendSearch } from './lib';

export const REQUEST_HOT_GHREPOS = 'REQUEST_HOT_GHREPOS';
export const RECEIVE_HOT_GHREPOS = 'RECEIVE_HOT_GHREPOS';
export const ERROR_RECEIVE_HOT_GHREPOS = 'ERROR_RECEIVE_HOT_GHREPOS';
export const RESET_HOT_GHREPOS = 'RESET_HOT_GHREPOS';

function requestHotGhRepos(language) {
  return {
    type: REQUEST_HOT_GHREPOS,
    language,
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

export function fetchHotGhRepos(language) {
  return function fetchReposThunk(dispatch) {
    dispatch(requestHotGhRepos(language));

    ghTrendSearch(language).fork(
      err => dispatch(receiveErrorHotGhRepos(err)),
      repos => dispatch(receiveHotGhRepos(repos))
    );
  };
}
