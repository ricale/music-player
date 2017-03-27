import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../actions/albums';

class AlbumDetail extends Component {
  componentWillMount () {
    const {dispatch, id} = this.props;
    dispatch(actions.fetchAlbumDetail(id));
  }

  componentWillReceiveProps () {

  }

  render () {
    const {album, artist, albumArtist, tracks} = this.props;
    if(!album) {
      return (
        <div></div>
      )
    }

    return (
      <div>        
        <h2>{album.title}</h2>

        <div>
          Artist: {albumArtist.name || artist.name}
        </div>

        {tracks.map(t =>
          <div key={`track-${t.id}`}>
            <span>{t.tracknum}</span>
            {' '}
            <span>{t.title}</span>
          </div>
        )}
      </div>
    )
  }
}


// FIXME: refactory this and albums/list
function mapStateToProps (state, ownProps) {
  const {albums, entities} = state;
  const {match} = ownProps;

  const id          = (match    && match.params || {}).id;
  const album       = (entities && entities.albums || {})[id];

  const artist      = album && album.artist       && (entities && entities.artists || {})[album.artist] || {};
  const albumArtist = album && album.album_artist && (entities && entities.artists || {})[album.album_artist] || {};
  const tracks      = (album && album.tracks || []).map(t => entities.tracks[t]);

  return {
    id,
    album,
    artist,
    albumArtist,
    tracks
  }
}

export default connect(mapStateToProps)(AlbumDetail);
