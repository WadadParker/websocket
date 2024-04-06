import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

//  http is native code for browser, we use express for middlewares ka easy routing

const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});

// Whenever we have websocket server, it still uses a HTTP server
// We can create the HTTP server via express as welll

// The below logic remains same for any websocket with any lib any platform
const wss = new WebSocketServer({ server });

// wss is websocket server, ws is websocket
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});