const { PoopClient } = require("./PoopClient");

const user1 = new PoopClient("anthony");
// const user2 = new PoopClient("clare");

user1.subscribe(["poop/clare"]);
// user2.subscribe(["poop/anthony"]);

user1.increment();
user1.increment();
user1.increment();

// user2.increment();
// user2.increment();
// user2.increment();
// user2.increment();

user1.getData();
// user2.getData();
