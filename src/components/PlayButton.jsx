import React, {Component} from 'react';
import Icon from './Icon';

export default class PlayButton extends Component {
  render () {
    const {onClick} = this.props;
    return (
      <Icon name='play-circle-o' size='4x' onClick={onClick} />
    )
  }
}