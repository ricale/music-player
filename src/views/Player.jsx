import React, {Component} from 'react';
import {connect} from 'react-redux';

import Icon from '../components/Icon';

import * as actions from '../actions/player';

import ODO from '../utils/odo';

class Player extends Component {
  constructor (props) {
    super(props);
    this.audio = new ODO({
      host: `http://localhost:3000/`,
      onEnd: this.onEndOne.bind(this)
    });
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
        this.audio.pause();
      }

      return;
    }


    if(playlist !== nextPlaylist) {
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
    dispatch(actions.play(current));
  }

  onClickPause () {
    const {dispatch} = this.props;
    dispatch(actions.pause());
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
    const {playing} = this.props;

    return (
      <div>
        <div>
          {!playing &&
            <Icon name='play' size='2x' onClick={this.onClickPlay.bind(this)} />
          }
          {playing &&
            <Icon name='pause' size='2x' onClick={this.onClickPause.bind(this)} />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const {playing, playlist, current} = state.player;
  return Object.assign({}, ownProps, {
    playing,
    current,
    playlist
  })
}

export default connect(mapStateToProps)(Player);
