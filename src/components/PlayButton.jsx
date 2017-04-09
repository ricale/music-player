import React, {Component} from 'react';
import Icon from './Icon';

export default class PlayButton extends Component {
  getIconName () {
    const {playing} = this.props;

    return playing ? 'pause-circle-o' : 'play-circle-o'
  }

  render () {
    const {onClick} = this.props;
    return (
      <Icon name={this.getIconName()} size='4x' onClick={onClick} />
    )
  }
}