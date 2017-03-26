import { normalize, schema } from 'normalizr';

const artist = new schema.Entity('artists');
const track  = new schema.Entity('tracks');

const album  = new schema.Entity('albums', {
  artist: artist,
  album_artist: artist,
  tracks: [track]
});

export {album};
