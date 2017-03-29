import {createAction} from 'redux-actions';
import {normalize} from 'normalizr';
import {request} from '../utils/request'

import * as t from '../constants/actionTypes';
import * as s from '../constants/schema';

const artistListRequest = createAction(t.ARTIST_LIST_REQUEST, () => ({}));
const artistListSuccess = createAction(t.ARTIST_LIST_SUCCESS, (response) => {
  const {entities, result: artists} = normalize(response, [s.artist]);
  return {entities, artists};
})
const artistListFailure = createAction(t.ARTIST_LIST_FAILURE, (message) => ({message}));

export function fetchArtistList () {
  return request(
    'http://localhost:3000/v1/artists',
    artistListRequest,
    artistListSuccess,
    artistListFailure
  )
}
