import React, {Component} from 'react';
import {connect} from 'react-redux';

import PlayButton from '../../components/PlayButton';

import * as actions from '../../actions/albums';

class AlbumDetail extends Component {
  componentWillMount () {
    const {dispatch, id, album} = this.props;
    if(!album || !album.id) {
      dispatch(actions.fetchAlbumDetail(id));
    }
  }

  componentWillReceiveProps () {
  }

  render () {
    const {album, albumArtist, tracks} = this.props;

    if(!album) {
      return (
        <div></div>
      )
    }

    return (
      <div>
        <h2>{album.title}</h2>

        <PlayButton />

        <div>
          Artist: {albumArtist.name}
        </div>

        <img src={`http://localhost:3000/images/${JSON.parse(album.images)[0]}`} width={200} height={200} />

        <table>
          <thead>
          </thead>
          <tbody>
            {tracks.map(t =>
              <tr key={`track-${t.id}`}>
                <td>{t.tracknum}</td>
                <td>{t.title}</td>
                <td>{t.artist && t.artist.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}


// FIXME: refactory this and albums/list
function mapStateToProps (state, ownProps) {
  const {albums, entities} = state;
  const {match} = ownProps;

  const id    = (match    && match.params || {}).id;
  const album = ownProps.album ||
    (entities && entities.albums || {})[id];

  const artists = (entities && entities.artists || {});

  const albumArtist = ownProps.albumArtist ||
    (album || {}).album_artist && artists[album.album_artist] || {};

  const tracks = ownProps.tracks ||
    (album && album.tracks || []).map(t => ({
      ...entities.musics[t],
      artist: artists[entities.musics[t].artist_id]
    }));

  return {
    id,
    album,
    albumArtist,
    tracks
  }
}

export default connect(mapStateToProps)(AlbumDetail);
