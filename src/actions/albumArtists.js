import {createAction} from 'redux-actions';
import {normalize} from 'normalizr';
import {request} from '../utils/request';

import * as t from '../constants/actionTypes';
import * as s from '../constants/schema';

const albumArtistListRequest = createAction(t.ALBUM_ARTIST_LIST_REQUEST, () => ({}));
const albumArtistListSuccess = createAction(t.ALBUM_ARTIST_LIST_SUCCESS, (response) => {
  const {entities, result: albumArtists} = normalize(response, [s.artist]);
  return {entities, albumArtists};
});
const albumArtistListFailure = createAction(t.ALBUM_ARTIST_LIST_FAILURE, (message) => ({message}));

export function fetchAlbumArtistList () {
  return request(
    'http://localhost:3000/v1/album_artists',
    albumArtistListRequest,
    albumArtistListSuccess,
    albumArtistListFailure
  );
}

const albumArtistDetailRequest = createAction(t.ALBUM_ARTIST_DETAIL_REQUEST, () => ({}));
const albumArtistDetailSuccess = createAction(t.ALBUM_ARTIST_DETAIL_SUCCESS, (response) => {
  const {entities, result: albumArtist} = normalize(response, s.artist);
  return {entities, albumArtist};
});
const albumArtistDetailFailure = createAction(t.ALBUM_ARTIST_DETAIL_FAILURE, (message) => ({message}));

export function fetchAlbumArtistDetail (id) {
  return request(
    `http://localhost:3000/v1/album_artists/${id}`,
    albumArtistDetailRequest,
    albumArtistDetailSuccess,
    albumArtistDetailFailure
  );
}
