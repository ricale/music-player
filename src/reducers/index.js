import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { albums } from './albums';
import { artists } from './artists';
import { entities } from './entities';

const rootReducer = combineReducers({
  albums,
  artists,
  entities,
  routing
});

export default rootReducer;
