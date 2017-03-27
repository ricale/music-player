import * as t from '../constants/actionTypes';

const initState = {
  records: []
};

export function albums (state = initState, action) {
  switch(action.type) {
    // case t.ALBUM_LIST_REQUEST:
    //   return Object.assign({}, state);

    case t.ALBUM_LIST_SUCCESS:
      const {albums: records} = action.payload;
      return Object.assign({}, state, {records});

    // FIXME: maybe current is unnecessary
    case t.ALBUM_DETAIL_SUCCESS:
      const {album: current} = action.payload;
      return Object.assign({}, state, {current});

    case t.ALBUM_LIST_FAILURE:
    case t.ALBUM_DETAIL_FAILURE:
      return Object.assign({}, state);
  }

  return state;
}
