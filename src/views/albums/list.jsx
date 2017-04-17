import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import AlbumDetail from './detail';

import * as actions from '../../actions/albums';

import './list.less';

class AlbumList extends Component {
  state = {
    opend: undefined
  }

  componentWillMount () {
    const {dispatch, albums} = this.props;
    if((albums || []).length === 0) {
      dispatch(actions.fetchAlbumList());
    }
  }

  onClickAlbumItem (i) {
    const {opend} = this.state;
    this.setState({opend: opend !== i && i})
  }

  getClassName (opend) {
    return `${opend ? ' open' : ''}`
  }

  render () {
    const {albums} = this.props;
    const {opend} = this.state;

    return (
      <div>
        <h2>Album List</h2>

        {albums.map((album, i) =>
          <div className={`album-item${opend === i ? ' open' : ''}`} key={`album-item-${i}`} >
            <Link to={`/albums/${album.id}`}>
              <img src={`http://localhost:3000/images/${JSON.parse(album.images)[0]}`} />
            </Link>
            <div className='album-item__title'>
              <Link to={`/albums/${album.id}`}>
                {album.title}
              </Link>
            </div>
            <div className='album-item__artist'>
              {album.album_artist_name}
            </div>

            {opend === i &&
              <div className='album-item__detail'>
                <AlbumDetail album={album}
                             albumArtist={album.album_artist} />
              </div>
            }
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const {albums: {records: ids}, entities} = state;

  const albums = ownProps.albums ||
    (ids || []).map(id => (entities && entities.albums)[id]);

  return {albums};
}

export default connect(mapStateToProps)(AlbumList);
