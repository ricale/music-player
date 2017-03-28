import {createAction} from 'redux-actions';
import fetch from 'isomorphic-fetch';
import {normalize} from 'normalizr';

import * as t from '../constants/actionTypes';
import * as s from '../constants/schema';

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response

  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJson (response) {
  return response.json()
}

function request (url, requestAction, successAction, failureAction, options = {}) {
  return dispatch => {
    dispatch(requestAction());

    return (
      fetch(url, options)
      .then(checkStatus)
      .then(parseJson)
      .then(json => dispatch(successAction(json)))
      .catch(({response}) => {
        if(response && response.json) {
          response.json().then(json => {
            console.log('error', json.message);
            return dispatch(failureAction(json.message));
          });

        } else {
          console.log('error', response);
          dispatch(failureAction(response));
        }
      })
    )
  }
}

const albumListRequest = createAction(t.ALBUM_LIST_REQUEST, () => ({}));
const albumListSuccess = createAction(t.ALBUM_LIST_SUCCESS, (response) => {
  const {entities, result: albums} = normalize(response, [s.album]);
  return {entities, albums};
});
const albumListFailure = createAction(t.ALBUM_LIST_FAILURE, (message) => ({message}));

export function fetchAlbumList () {
  return request(
    'http://localhost:3000/albums',
    albumListRequest,
    albumListSuccess,
    albumListFailure
  )
}

const albumDetailRequest = createAction(t.ABLUM_DETAIL_REQUEST, () => ({}));
const albumDetailSuccess = createAction(t.ALBUM_DETAIL_SUCCESS, (response) => {
  const {entities, result: album} = normalize(response, s.album);
  return {entities, album};
});
const albumDetailFailure = createAction(t.ALBUM_DETAIL_FAILURE, (message) => ({message}));

export function fetchAlbumDetail (id) {
  return request(
    `http://localhost:3000/albums/${id}`,
    albumDetailRequest,
    albumDetailSuccess,
    albumDetailFailure
  )
}
