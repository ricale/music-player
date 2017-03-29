import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import {albumArtists} from './albumArtists';
import {albums}       from './albums';
import {artists}      from './artists';
import {entities}     from './entities';

const rootReducer = combineReducers({
  albumArtists,
  albums,
  artists,
  entities,
  routing
});

export default rootReducer;
