import React, {Component} from 'react';
import {connect} from 'react-redux';

import Icon from '../components/Icon';

import * as actions from '../actions/player';

import ODO from '../utils/odo';
import ArrayUtil from '../utils/ArrayUtil';

import './player.less';

class Player extends Component {
  constructor (props) {
    super(props);
    this.audio = new ODO({
      host: `http://localhost:3000/`,
      onEnd: this.onEndOne.bind(this)
    });

    this.onClickPlay = this.onClickPlay.bind(this);
    this.onClickPause = this.onClickPause.bind(this);
    this.onClickBackward = this.onClickBackward.bind(this);
    this.onClickForward = this.onClickForward.bind(this);
    this.onClickList = this.onClickList.bind(this);
  }

  componentWillMount () {
    const {playing, playlist} = this.props;

    if(playing) {
      this.audio.setPlaylist(playlist).play();
    }
  }

  componentWillReceiveProps (nextProps) {
    const {playing, playlist, current} = this.props;
    const {
      playing:  nextPlaying,
      playlist: nextPlaylist,
      current:  nextCurrent
    } = nextProps;

    if(playing !== nextPlaying) {
      if(nextPlaying) {
        if(playlist !== nextPlaylist) {
          this.audio.setPlaylist(nextPlaylist)
        }
        this.audio.play();

      } else {
        if(nextCurrent === null) {
          this.audio.stop();
        } else {
          this.audio.pause();
        }
      }

      return;
    }


    if(!ArrayUtil.isEqual(playlist.map(p => p.id), nextPlaylist.map(p => p.id))) {
      this.audio.setPlaylist(nextPlaylist);
      if(nextPlaying) {
        this.audio.play();
      }

      return;
    }

    if(current !== nextCurrent) {
      this.audio.play(nextCurrent);
    }
  }

  onClickPlay () {
    const {dispatch, current} = this.props;
    dispatch(actions.play(current || 0));
  }

  onClickPause () {
    const {dispatch} = this.props;
    dispatch(actions.pause());
  }

  onClickBackward () {
    const {playing, dispatch, current} = this.props;

    if(!playing) {
      return;
    }

    if(current === 0) {
      dispatch(actions.endPlaylist());
    } else {
      dispatch(actions.play(current - 1));
    }
  }

  onClickForward () {
    const {playing, dispatch, current, playlist} = this.props;

    if(!playing) {
      return;
    }

    if(current === playlist.length - 1) {
      dispatch(actions.endPlaylist());
    } else {
      dispatch(actions.play(current + 1));
    }
  }

  onClickList () {
    const {playlist, dispatch, showPlaylist} = this.props;

    if(!playlist) {
      return;
    }

    dispatch(actions.showPlaylist(!showPlaylist));
  }

  onEndOne () {
    const {dispatch, current, playlist, playing} = this.props;
    if(current < playlist.length - 1) {
      dispatch(actions.play(current + 1));
    } else {
      dispatch(actions.endPlaylist());
    }
  }

  render () {
    const {playing, playlist, song, songArtist, songAlbum, showPlaylist} = this.props;

    if(!playlist || playlist.length === 0) {
      return (
        <div></div>
      )
    }

    return (
      <div className='player'>
        <div className='player__information'>
          {song ?
            `[${songAlbum.title}] ${song.tracknum}. ${song.title} - ${songArtist.name}` :
            "I'M READY"
          }
        </div>
        <div className='player__controller'>
          <Icon name='fast-backward' size='2x' onClick={this.onClickBackward} disabled={!playing} />

          {!playing &&
            <Icon name='play' size='2x' onClick={this.onClickPlay} />
          }
          {playing &&
            <Icon name='pause' size='2x' onClick={this.onClickPause} />
          }

          <Icon name='fast-forward' size='2x' onClick={this.onClickForward} disabled={!playing} />

          <Icon name='list' size='2x' onClick={this.onClickList} />
        </div>

        {showPlaylist &&
          <div className='player__playlist'>
            <table>
              <thead>
              </thead>
              <tbody>
                {playlist.map(t =>
                  <tr key={`playlist-${t.id}`}>
                    <td>{t.tracknum}</td>
                    <td>{t.title}</td>
                    <td>{t.artist && t.artist.name}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const {player, entities: {artists, albums}} = state;

  const song       = player.playlist[player.current];
  const songArtist = song && artists[song.artist_id];
  const songAlbum  = song && albums[song.album_id];

  return Object.assign({}, ownProps, {
    ...player,

    song,
    songArtist,
    songAlbum
  })
}

export default connect(mapStateToProps)(Player);
