import Chat from './Chat';

const chat = new Chat(document.querySelector('.chat'), 'ws://ahj-ws-1.herokuapp.com/ws');
chat.init();
