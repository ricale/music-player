import {createAction} from 'redux-actions';

import * as t from '../constants/actionTypes';

export const play  = createAction(t.PLAY,  (current = 0) => ({player: {playing: true, current}}));
export const pause = createAction(t.PAUSE, ()            => ({player: {playing: false}}));

export const setPlaylist = createAction(t.SET_PLAYLIST, (playlist) => ({player: {playlist}}));
export const endPlaylist = createAction(t.END_PLAYLIST, ()         => ({player: {playing: false, current: 0}}));
