const { MyClient } = require("./MyClient");

class PoopClient extends MyClient {
  constructor(username) {
    super(username); // construct superclass using username

    // a listener for getting data
    this.onInit();
  }

  subscribe(toSubscribe) {
    this.socket.emit("subscribe", toSubscribe);
    // what to do on subscription
    for (let i = 0; i < toSubscribe.length; i++) {
      this.socket.on(toSubscribe[i], (data) => {
        console.log(
          `${this.username} received data from channel ${toSubscribe[i]}: ${data}`

          // this area shoiuld change frontend code.
        );
      });
    }
  }

  // increment
  increment() {
    this.socket.emit("publish", { command: `poop/${this.username}/increment` });
  }

  // decrement
  decrement() {
    this.socket.emit("publish", { command: `poop/${this.username}/decrement` });
  }

  // get data
  getData() {
    this.socket.emit("publish", { command: `poop/${this.username}/getData` });
  }

  // hander for get data
  onGetData(data) {
    console.log(`${this.username} received data`, data);
  }

  // init procedures for the client. Should include all "onGET__" functions
  onInit() {
    // response to getting data
    this.socket.on(`poop/${this.username}/getData`, (data) =>
      this.onGetData(data)
    );
  }
}

module.exports = { PoopClient };
