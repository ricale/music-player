import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../actions/albums';

class AlbumList extends Component {
  componentDidMount () {
    const {dispatch} = this.props;
    dispatch(actions.fetchAlbumList());
  }

  render () {
    const {albums} = this.props;

    return (
      <div>
        <h2>Album List</h2>
        <table>
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
            {albums.map(album =>
              <tr key={`album-row-${album.id}`}>
                <td>
                  <Link to={`/albums/${album.id}`}>{album.title}</Link>
                </td>
                <td>
                  {(album.album_artist || {}).id}<br/>
                  {(album.album_artist || {}).name}
                </td>
                <td>
                  {JSON.parse(album.images)[0] &&
                    <img src={`http://localhost:3000/images/${JSON.parse(album.images)[0]}`} width={100} height={100} />
                  }
                </td>
                <td>{JSON.parse(album.images)[0]}</td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const {albums: {records: ids}, entities} = state;

  const artists = (entities || {}).artists;

  const albums = (ids || []).map(id => {
    const album = (entities && entities.albums)[id];
    const album_artist = artists[album.album_artist];
    return { ...album, album_artist }
  })

  return {albums};
}

export default connect(mapStateToProps)(AlbumList);
