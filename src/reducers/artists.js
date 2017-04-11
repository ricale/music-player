import * as t from '../constants/actionTypes';

const initState = {
  records: []
};

export function artists (state = initState, action) {
  switch(action.type) {
  case t.ARTIST_LIST_SUCCESS: {
    const {artists: records} = action.payload;
    return Object.assign({}, state, {records});
  }

  case t.ARTIST_LIST_FAILURE:
  // case t.ARTIST_DETAIL_FAILURE:
    return state;
  }

  return state;
}
