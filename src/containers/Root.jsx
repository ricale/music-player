import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createHashHistory'

import rootReducer from '../reducers';

import App               from '../views/App';
import AlbumList         from '../views/albums/list';
import AlbumDetail       from '../views/albums/detail';
import ArtistList        from '../views/artists/list';
import AlbumArtistList   from '../views/albumArtists/list';
import AlbumArtistDetail from '../views/albumArtists/detail';

import './Root.less';

export default class Root extends Component {
  comopnentDidMount () {

  }

  render () {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      rootReducer,
      {}, // preloadedState
      composeEnhancers(
        applyMiddleware(thunk)
      )
    );

    const history = createHistory();

    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route path="/" component={App} />

            <div className='contents'>
              <Route path="/albums"     exact component={AlbumList} />
              <Route path="/albums/:id"       component={AlbumDetail} />

              <Route path="/artists" exact component={ArtistList} />

              <Route path="/album_artists"     exact component={AlbumArtistList} />
              <Route path="/album_artists/:id"       component={AlbumArtistDetail} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
