const logs = require('../utils/logs');

module.exports = class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;
  }

  async listen(message) {
    try {
      const {userId, targetEmail} = JSON.parse(message.content.toString());

      const notes = await this._playlistsService.getPlaylists(userId);
      const res = await this._mailSender.sendEmail(
          targetEmail, JSON.stringify(notes),
      );

      console.log(`Sended to ${res.envelope.to}`);
    } catch (e) {
      await logs.writeLogs(e.message);
    }
  }
};
