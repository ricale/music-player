import React, {Component} from 'react';
import {connect} from 'react-redux';

import PlayButton from '../../components/PlayButton';

import * as albumActions  from '../../actions/albums';
import * as playerActions from '../../actions/player';

import ArrayUtil from '../../utils/ArrayUtil';

class AlbumDetail extends Component {
  componentWillMount () {
    const {dispatch, id, album} = this.props;
    if(!album || !album.id) {
      dispatch(albumActions.fetchAlbumDetail(id));
    }
  }

  componentWillReceiveProps () {
  }

  onClickPlayButton () {
    const {dispatch, tracks} = this.props;
    if(this.isPlaying()) {
      dispatch(playerActions.pause());

    } else if(this.isEqualToPlaylist()) {
      dispatch(playerActions.play());

    } else {
      dispatch(playerActions.setPlaylist(tracks));
      dispatch(playerActions.play());
    }
  }

  isEqualToPlaylist () {
    const {tracks, playlist} = this.props;
    return ArrayUtil.isEqual(tracks.map(t => t.id), playlist.map(p => p.id))
  }

  isPlaying () {
    const {playing} = this.props;
    return playing && this.isEqualToPlaylist();
  }

  render () {
    const {album, albumArtist, tracks, playing, playlist} = this.props;

    if(!album) {
      return (
        <div></div>
      )
    }

    return (
      <div>
        <h2>{album.title}</h2>

        <PlayButton
          tracks={tracks}
          onClick={this.onClickPlayButton.bind(this)}
          playing={this.isPlaying()}
        />

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
  const {albums, entities, player: {playing, playlist}} = state;
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
    tracks,

    playing,
    playlist
  }
}

export default connect(mapStateToProps)(AlbumDetail);
