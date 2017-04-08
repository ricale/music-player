import React, {Component} from 'react';

import 'font-awesome/css/font-awesome.css';

export default class Icon extends Component {
  render () {
    const {name} = this.props;

    return (
      <i className={`fa fa-${name}`}></i>
    )
  }
}
