import {createAction} from 'redux-actions';
import {normalize} from 'normalizr';
import {request} from '../utils/request';

import * as t from '../constants/actionTypes';
import * as s from '../constants/schema';

const albumListRequest = createAction(t.ALBUM_LIST_REQUEST, () => ({}));
const albumListSuccess = createAction(t.ALBUM_LIST_SUCCESS, (response) => {
  const {entities, result: albums} = normalize(response, [s.album]);
  return {entities, albums};
});
const albumListFailure = createAction(t.ALBUM_LIST_FAILURE, (message) => ({message}));

export function fetchAlbumList () {
  return request(
    'http://localhost:3000/v1/albums',
    albumListRequest,
    albumListSuccess,
    albumListFailure
  );
}

const albumDetailRequest = createAction(t.ABLUM_DETAIL_REQUEST, () => ({}));
const albumDetailSuccess = createAction(t.ALBUM_DETAIL_SUCCESS, (response) => {
  const {entities, result: album} = normalize(response, s.album);
  return {entities, album};
});
const albumDetailFailure = createAction(t.ALBUM_DETAIL_FAILURE, (message) => ({message}));

export function fetchAlbumDetail (id) {
  return request(
    `http://localhost:3000/v1/albums/${id}`,
    albumDetailRequest,
    albumDetailSuccess,
    albumDetailFailure
  );
}
