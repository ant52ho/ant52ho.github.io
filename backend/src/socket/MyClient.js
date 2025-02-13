const io = require("socket.io-client");
const port = 5000;
// const ip = "0.0.0.0";
// const ip = "137.66.24.2";
const url = "https://ant-personal-site-backend.fly.dev";
const socket = io(`${url}:${port}`, {
  transports: ["websocket"],
});
// const socket = io(`http://${ip}:${port}`);

class MyClient {
  constructor(username) {
    this.username = username;
    this.subscribed = [];
    this.port = 5000;
    // this.ip = "0.0.0.0";
    // this.ip = "137.66.24.2";
    this.socket = socket;
    console.log("Running socket program");
    console.log(`Connecting to ${url}:${port}`);

    // Handle connection event
    this.socket.on("connect", () => {
      console.log("Connected to the server");
    });

    // Handle disconnection event
    this.socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
  }

  // handle subscribe
  subscribe(toSubscribe) {
    socket.emit("subscribe", toSubscribe);
  }

  unsubscribe(toUnsubscribe) {
    socket.emit("unsubscribe", toUnsubscribe);
  }

  // handle publish
  publish(command) {
    socket.emit("publish", command);
  }
}

module.exports = { MyClient };
