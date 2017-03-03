import { combineReducers } from 'redux';

import { REQUEST_HOT_GHREPOS, RECEIVE_HOT_GHREPOS,
    ERROR_RECEIVE_HOT_GHREPOS, RESET_HOT_GHREPOS } from './actions';

function hotGhRepos(state = {
  isFetching: false,
  repos: [],
  error: null,
}, action) {
  switch (action.type) {
    case REQUEST_HOT_GHREPOS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_HOT_GHREPOS:
      return Object.assign({}, state, {
        isFetching: false,
        repos: action.repos,
      });
    case ERROR_RECEIVE_HOT_GHREPOS:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
      });
    case RESET_HOT_GHREPOS:
      return Object.assign({}, state, {
        error: null,
        repos: [],
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  hotGhRepos,
});

export default rootReducer;
