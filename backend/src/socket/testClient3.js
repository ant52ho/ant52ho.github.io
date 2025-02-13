const io = require("socket.io-client");

// Replace 'your_device_ip' with the external IP address of the device running the server
const socket = io("https://ant-personal-site-backend.fly.dev:5000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to the server!");
});

socket.on("connect_error", (err) => {
  console.error("Connection failed:", err.message);
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server.");
});
