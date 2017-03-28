import * as t from '../constants/actionTypes';

const initState = {
};

export function entities (state = initState, action) {
  const {entities} = (action.payload || {});

  switch(action.type) {
    // case t.ALBUM_LIST_REQUEST:
    //   return Object.assign({}, state);

    case t.ALBUM_LIST_SUCCESS:
    case t.ALBUM_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        ...entities,
        albums:  Object.assign({}, state.albums,  entities.albums),
        artists: Object.assign({}, state.artists, entities.artists),
        musics:  Object.assign({}, state.musics,  entities.musics)
      });
  }

  return state;
}
