import {createAction} from 'redux-actions';
import {normalize} from 'normalizr';

import * as t from '../constants/actionTypes';
import * as s from '../constants/schema';

const play      = createAction(t.PLAY,                   () =>         ({player: {playing: true}}));
const addMusics = createAction(t.ADD_MUSICS_TO_PLAYLIST, (playlist) => ({player: {playlist}}));

export function playMusics (musics = []) {
  console.log('playMusics', musics)
  return dispatch => {
    if(musics.length === 0) {
      dispatch(play());

    } else {
      dispatch(addMusics(musics))
      dispatch(play())
    }
  }
}
