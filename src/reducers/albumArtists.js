import * as t from '../constants/actionTypes';

const initState = {
  records: []
};

export function albumArtists (state = initState, action) {
  switch(action.type) {
  case t.ALBUM_ARTIST_LIST_SUCCESS: {
    const {albumArtists: records} = action.payload;
    return Object.assign({}, state, {records});
  }

  case t.ALBUM_ARTIST_DETAIL_SUCCESS:
    return state;

  case t.ALBUM_ARTIST_LIST_FAILURE:
  case t.ALBUM_ARTIST_DETAIL_FAILURE:
    return state;
  }

  return state;
}
