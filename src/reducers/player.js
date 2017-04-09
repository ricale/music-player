import * as t from '../constants/actionTypes';

const initState = {
  playing:  false,
  playlist: [],
  current:  0,
};

export function player (state = initState, action) {
  switch(action.type) {
    case t.PLAY:
    case t.PAUSE:
    case t.SET_PLAYLIST:
      const {player} = action.payload;
      return Object.assign({}, state, player);
  }

  return state;
}
