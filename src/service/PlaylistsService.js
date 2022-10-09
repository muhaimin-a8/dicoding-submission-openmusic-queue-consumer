const {Pool} = require('pg');

module.exports = class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(userId) {
    const playlist = await this._pool.query({
      text: `SELECT p.id, p.name FROM playlists p
            LEFT JOIN collaborations c ON c.playlist_id = p.id
            WHERE p.owner = $1 OR c.user_id = $1`,
      values: [userId],
    });

    const songs = await this._pool.query({
      text: `SELECT s.id, s.title, s.performer FROM songs s
            LEFT JOIN playlist_songs ps ON s.id = ps.song_id
            LEFT JOIN playlists p ON p.id = ps.playlist_id
            WHERE p.owner = $1`,
      values: [userId],
    });

    playlist.rows[0].songs = songs.rows;

    return playlist.rows[0];
  }
};
