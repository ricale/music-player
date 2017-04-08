import React, {Component} from 'react';

import 'font-awesome/css/font-awesome.css';

export default class Icon extends Component {
  getSizeClassName () {
    const {size} = this.props;

    if(!size) {
      return ''
    }

    switch(size) {
      case 'lg':
      case '2x':
      case '3x':
      case '4x':
      case '5x':
        return `fa-${size}`

      default:
        return ''
    }
  }

  render () {
    const {name, size, onClick} = this.props;

    return (
      <i className={`fa fa-${name} ${this.getSizeClassName()}`} onClick={onClick}></i>
    )
  }
}
