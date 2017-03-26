import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/albums';

class AlbumList extends Component {
  componentDidMount () {
    const {dispatch} = this.props;
    dispatch(actions.fetchAlbumList());
  }

  getArtistName (artistId) {
    const {entities: {artists}} = this.props;
    if(artistId) {
      return artists[artistId] ? artists[artistId].name : `artistId ${artistId}`;

    } else {
      return '';
    }
  }

  render () {
    const {albums: {records: ids}, entities: {albums, artists}} = this.props;

    return (
      <div>
        <h2>Album List</h2>
        <table>
          <thead>
            <tr>
            </tr>
          </thead>
          <tbody>
            {(ids || []).map((a) =>
              <tr key={`album-row-${albums[a].id}`}>
                <td>{albums[a].title}</td>
                <td>{this.getArtistName(albums[a].artist)}</td>
                <td>{this.getArtistName(albums[a].album_artist)}</td>
                <td><img src={`http://localhost:3000/images/${JSON.parse(albums[a].images)[0]}`} width={100} height={100} /></td>
                <td>{JSON.parse(albums[a].images)[0]}</td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {albums, entities} = state;
  return {albums, entities};
}

export default connect(mapStateToProps)(AlbumList);
