import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../actions/albumArtists';

class AlbumArtistList extends Component {
  componentDidMount () {
    const {dispatch} = this.props;
    dispatch(actions.fetchAlbumArtistList());
  }

  render () {
    const {albumArtists} = this.props;

    return (
      <div>
        <h2>Album Artist List</h2>
        <table>
          <thead>
          </thead>
          <tbody>
            {albumArtists.map(artist =>
              <tr key={`artist-row-${artist.id}`}>
                <td>
                  <Link to={`/album_artists/${artist.id}`}>{artist.name}</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const {albumArtists: {records: ids}, entities} = state;

  const albumArtists = (ids || []).map(id =>
    (entities && entities.artists)[id]
  )

  return {albumArtists};
}

export default connect(mapStateToProps)(AlbumArtistList);
