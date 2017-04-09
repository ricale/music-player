import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Player from './Player';

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to='/albums'>Albums</Link></li>
          <li><Link to='/album_artists'>Album Artists</Link></li>
          <li><Link to='/artists'>Artists</Link></li>
        </ul>
        <Player />
        {this.props.children}
      </div>
    )
  }
}
