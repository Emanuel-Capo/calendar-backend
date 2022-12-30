const express = require("express");
const { dbConection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

// crear servidor
const app = express();

// base de datos
dbConection();

// CORS
app.use(cors());

// directorio público
app.use(express.static("public"));

// lectura y parseo del body
app.use(express.json());

// rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// escuchar peticiones
app.listen(process.env.PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}`));
