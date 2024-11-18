const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

//route import and mount
const routes = require("./Routes/routes.js");
app.use("/api/v1", routes);

//actuivate

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})