import { normalize, schema } from 'normalizr';

const artist = new schema.Entity('artists');
const music  = new schema.Entity('musics');

const album  = new schema.Entity('albums', {
  artists: [artist],
  album_artist: artist,
  tracks: [music]
});

export {album, artist};