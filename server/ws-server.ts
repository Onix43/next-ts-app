import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3001 });

const messages: any[] = [];

wss.on('connection', ws => {
  console.log('client connected');

  ws.send(
    JSON.stringify({
      type: 'INIT',
      payload: messages,
    })
  );

  ws.on('message', message => {
    const parsed = JSON.parse(message.toString());

    if (parsed.type === 'SEND_MESSAGE') {
      const newMessage = {
        id: Date.now(),
        text: parsed.payload.text,
      };

      messages.push(newMessage);

      wss.clients.forEach(client => {
        client.send(
          JSON.stringify({
            type: 'NEW_MESSAGE',
            payload: newMessage,
          })
        );
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
