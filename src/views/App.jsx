import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Player from './Player';

import './App.less';

export default class App extends Component {
  render () {
    return (
      <div className='header'>
        <h1 className='header__title'>App</h1>
        <ul className='header__menu'>
          <li><Link to='/albums'>Albums</Link></li>
          <li><Link to='/album_artists'>Album Artists</Link></li>
          <li><Link to='/artists'>Artists</Link></li>
        </ul>
        <Player />
      </div>
    )
  }
}
