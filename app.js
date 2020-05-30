const express = require("express");

const bodyParser = require("body-parser");

const server = express();

require("./database");

server.use(bodyParser.json());

// Routes
server.use("/api/registro", require("./routes/usuarios"));
server.use("/api/productos", require("./routes/productos"));
server.use("/api/pedido", require("./routes/pedido"));

// Servidor
const port = 3000;
server.listen(port, () => {
  console.log("Servidor creado exitosamente");
});
