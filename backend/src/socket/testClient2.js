const { PoopClient } = require("./PoopClient");

const user2 = new PoopClient("clare");

user2.subscribe(["poop/anthony"]);
user2.increment();
user2.increment();
user2.decrement();
user2.decrement();
user2.getData();
