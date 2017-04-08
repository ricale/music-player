import * as t from '../constants/actionTypes';

const initState = {
};

export function player (state = initState, action) {
  switch(action.type) {
    case t.PLAY:
    case t.ADD_MUSICS_TO_PLAYLIST:
      const {player} = action.payload;
      return Object.assign({}, state, player);
  }

  return state;
}
