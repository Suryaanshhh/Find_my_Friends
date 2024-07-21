const Express = require("express");
const app = Express();
const http = require("http");
const sockets = require("socket.io");
const path = require("path");
const server = http.createServer(app);

const io = sockets(server);

app.use(Express.static(path.join(__dirname, "frontend")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend/index.html"));
});

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("recieve-location", { id: socket.id, ...data });
  });
  console.log("connected");
});

server.listen(3000);
