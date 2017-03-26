import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { albums } from './albums';
import { entities } from './entities';

const rootReducer = combineReducers({
  albums,
  entities,
  routing
});

export default rootReducer;
