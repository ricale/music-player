import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../actions/albums';

import './list.less';

class AlbumList extends Component {
  componentWillMount () {
    const {dispatch, albums} = this.props;
    if((albums || []).length === 0) {
      dispatch(actions.fetchAlbumList());
    }
  }

  render () {
    const {albums} = this.props;

    return (
      <div>
        <h2>Album List</h2>

        {albums.map((album, i) =>
          <div className='album-item' key={`album-item-${i}`}>
            <Link className='album-item__thumbnail' to={`/albums/${album.id}`}>
              <img src={`http://localhost:3000/images/${JSON.parse(album.images)[0]}`} />
            </Link>
            <Link className='album-item__title' to={`/albums/${album.id}`}>
              {album.title}
            </Link>
            <Link className='album-item__artist' to={`/album_artists/${album.album_artist_id}`}>
              {(album.album_artist || {}).name}
            </Link>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const {albums: {records: ids}, entities} = state;

  const artists = (entities || {}).artists;

  const albums = ownProps.albums ||
    (ids || []).map(id => {
      const album = (entities && entities.albums)[id];
      const album_artist = artists[album.album_artist];
      return { ...album, album_artist }
    });

  return {albums};
}

export default connect(mapStateToProps)(AlbumList);
