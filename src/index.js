require('dotenv').config();
const amqp = require('amqplib');
const PlaylistsService = require('./service/PlaylistsService');
const MailSender = require('./mail/MailSender');
const Listener = require('./listener/listener');

const init = async () => {
  const listener = new Listener(
      new PlaylistsService(),
      new MailSender(),
  );

  const conn= await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await conn.createChannel();

  await channel.assertQueue('export:playlist', {
    durable: true,
  });

  await channel.consume('export:playlist',
      (message) => listener.listen(message),
      {noAck: true},
  );
};

init();
