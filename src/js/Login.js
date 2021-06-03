export default class Login {
  constructor(element, server) {
    this.server = server;
    this.parentElement = element;
    this.form = this.parentElement.querySelector('.chat_login_form');
    this.nickname = this.parentElement.querySelector('.chat_login_input');

    this.login = this.login.bind(this);
    this.showError = this.showError.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  connect() {
    this.form.addEventListener('submit', this.login);
  }

  login(e) {
    e.preventDefault();
    this.ws = new WebSocket(this.server);

    this.ws.addEventListener('open', () => {
      this.ws.send(JSON.stringify({ event: 'login', message: this.nickname.value }));
    });

    // this.ws.addEventListener('message', (evt) => {
    //   console.log(evt.data);
    // });

    this.ws.addEventListener('close', this.showError);

    this.ws.addEventListener('error', (evt) => {
      console.error(evt);
    });
  }

  showError(evt) {
    const error = document.createElement('div');
    error.classList.add('chat_login_error');
    error.innerText = evt.reason;
    this.parentElement.querySelector('.chat_login_container').append(error);
    error.style.left = `${this.nickname.offsetLeft + this.nickname.offsetWidth / 2 - error.offsetWidth / 2}px`;
    error.style.top = `${this.nickname.offsetTop + this.nickname.offsetHeight}px`;

    this.nickname.addEventListener('focus', this.removeError);
  }

  removeError() {
    this.nickname.value = '';
    const error = this.parentElement.querySelector('.chat_login_error');
    if (error) {
      error.remove();
    }
  }
}
