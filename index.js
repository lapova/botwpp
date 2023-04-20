const express = require("express");
const apiRoute = require("./routes/routes");

//conexión al puerto
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/whatsapp", apiRoute);
app.listen(PORT, () => { console.log("El puerto es " + PORT) });
