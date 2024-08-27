const { server } = require("../app");
const { Server } = require("socket.io");
const io = new Server(server);
const PoopCache = require("../cache/poopdb");
const PoopTrack = require("../models/pooptrack");
const { PoopNotify } = require("../cache/poopNotify");

// okay let's implement a pub sub system now.

// store to db every 4 hours
const interval = 4 * 60 * 60 * 1000;
setInterval(() => {
  // Your code to execute every 4 hours
  console.log("Updated in mem cache to db");

  // db update function here. mod poop track controller.
  const result = PoopCache.sync();
}, interval);

// Listen for new connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // setInterval(() => {
  //   io.to("clare").emit("message", "Hello from channel 1!");
  // }, 1000);

  // message channel
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    socket.emit("message", `Server received: ${msg}`);
  });

  // subscribe channel / rooms
  socket.on("subscribe", (topics) => {
    console.log(`Subscribing to channel: ${topics}`);
    socket.join(topics);
  });

  // unsub channel
  socket.on("unsubscribe", (topic) => {
    console.log(`Unsubscribing from channel: ${topic}`);
    socket.leave(topic);
  });

  // publish to topic
  // requests take in a command field
  socket.on("publish", (req) => {
    console.log(req);
    handleCommand(req);
    // io.to(event).emit(event, args);
  });

  // dc channel
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// handler for all possible command calls
function handleCommand(req) {
  if (req.split("/")[0] == "poop") {
    handlePoop(req);
  }
}

function handlePoop(req) {
  const parts = req.split("/");
  2;
  const type = parts[0];
  const sender = parts[1];
  const cmd = parts[2];

  const subs = `${type}/${sender}`;

  if (cmd == "getData") {
    console.log(req);
    io.emit(req, PoopCache.db[sender]);
  } else if (cmd == "increment" || cmd == "decrement") {
    // notify all subscribers of sender
    PoopNotify.notify(sender);

    if (cmd == "increment") {
      PoopCache.db[sender] += 1;
      io.emit(subs, PoopCache.db[sender]);
    } else if (cmd == "decrement") {
      if (PoopCache.db[sender] > 0) {
        PoopCache.db[sender] -= 1;
        io.emit(subs, PoopCache.db[sender]);
      }
    }
  } else if (cmd == "getAllData") {
    io.emit(`${type}/getAllData`, PoopCache.db);
  }
}

module.exports = io;
