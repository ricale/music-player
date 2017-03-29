import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as actions from '../../actions/artists';

class ArtistList extends Component {
  componentDidMount () {
    const {dispatch} = this.props;
    dispatch(actions.fetchArtistList());
  }

  render () {
    const {artists} = this.props;

    return (
      <div>
        <h2>Artist List</h2>
        <table>
          <thead>
          </thead>
          <tbody>
            {artists.map(artist =>
              <tr key={`artist-row-${artist.id}`}>
                <td>
                  <Link to={`albums${artist.id}`}>{artist.name}</Link>
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
  const {artists: {records: ids}, entities} = state;

  console.log('ids', ids);
  console.log('entities', entities);

  const artists = (ids || []).map(id =>
    (entities && entities.artists)[id]
  )

  return {artists};
}

export default connect(mapStateToProps)(ArtistList);
