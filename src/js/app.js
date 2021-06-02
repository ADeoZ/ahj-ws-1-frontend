const ws = new WebSocket('ws://localhost:7070/ws');

ws.addEventListener('open', () => {
  console.log('connected');
  ws.send('hello');
});

ws.addEventListener('message', (evt) => {
  console.log(evt.data);
});

ws.addEventListener('close', (evt) => {
  console.log('connection closed', evt);
});

ws.addEventListener('error', () => {
  console.log('error');
});

setTimeout(() => {
  try {
    ws.send('How are you?');
  } catch (e) {
    console.log('err');
    console.log(e);
  }
}, 3000);