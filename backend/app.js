const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const {readdirSync} = require("fs")
const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI).then(() => {
 console.log("MONGO_DB CONNECTED")
}).catch((error) => {
 console.error("Error connecting " + error)
})

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes").map((route) => {
  app.use("/api/v1", require("./routes/" + route))
})


app.listen(PORT, () => {
  console.log("listening to port:", PORT);
});
