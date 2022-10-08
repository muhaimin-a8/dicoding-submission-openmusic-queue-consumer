const {Pool} = require('pg');

module.exports = class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(userId) {
    const res = await this._pool.query({
      text: `SELECT p.id, p.name, u.username FROM playlists p
            LEFT JOIN collaborations c on c.playlist_id = p.id
            LEFT JOIN users u ON u.id = p.owner
             WHERE p.owner = $1 OR c.user_id = $1`,
      values: [userId],
    });

    return res.rows;
  }
};
