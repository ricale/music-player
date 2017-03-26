import * as t from '../constants/actionTypes';

const initState = {
};

export function entities (state = initState, action) {
  switch(action.type) {
    // case t.ALBUM_LIST_REQUEST:
    //   return Object.assign({}, state);

    case t.ALBUM_LIST_SUCCESS:
      const {entities} = action.payload;
      return Object.assign({}, state, entities);

    case t.ALBUM_LIST_FAILURE:
      return Object.assign({}, state);
  }

  return state;
}
