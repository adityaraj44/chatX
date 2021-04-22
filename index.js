const express = require("express");

const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 3000;
const io = require("socket.io")(server);
// import path among other dependencies
const path = require("path");
app.use(express.static(path.join(__dirname + "/public")));

// just to test the server
app.get("/", (req, res) => {
  res.send("its working").status(200);
});

io.on("connection", (socket) => {
  //   console.log("Some client connected");

  socket.on("chat", (message) => {
    console.log("from client: ", message);
    io.emit("chat", message);
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
