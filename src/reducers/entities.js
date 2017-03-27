import * as t from '../constants/actionTypes';

const initState = {
};

export function entities (state = initState, action) {
  const {entities} = (action.payload || {});

  switch(action.type) {
    // case t.ALBUM_LIST_REQUEST:
    //   return Object.assign({}, state);

    case t.ALBUM_LIST_SUCCESS:
      return Object.assign({}, state, entities);

    case t.ALBUM_DETAIL_SUCCESS:
      return Object.assign({}, state, entities);
  }

  return state;
}
