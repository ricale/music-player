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

    case t.ALBUM_DETAIL_SUCCESS:
      return state;

    case t.ALBUM_LIST_FAILURE:
    case t.ALBUM_DETAIL_FAILURE:
      return state;
  }

  return state;
}
