import React, {Component} from 'react';
import {connect} from 'react-redux';

import AlbumList from '../albums/list';

import * as actions from '../../actions/albumArtists';

class AlbumArtistDetail extends Component {
  componentWillMount () {
    const {dispatch, id} = this.props;
    dispatch(actions.fetchAlbumArtistDetail(id));
  }

  render () {
    const {albumArtist, albums} = this.props;

    if(!albumArtist) {
      return (
        <div></div>
      )
    }

    return (
      <div>
        <h2>{albumArtist.name}</h2>

        {(albums || []).length > 0 &&
          <AlbumList albums={albums}/>
        }
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const {albumArtists, entities} = state;
  const {match} = ownProps;

  const id = (match && match.params || {}).id;
  const albumArtist = (entities && entities.artists || {})[id];

  const albums = (albumArtist && albumArtist.albums || []).map(a => ({
    ...entities.albums[a]
  }));

  return {
    id,
    albumArtist,
    albums
  }
}

export default connect(mapStateToProps)(AlbumArtistDetail);
