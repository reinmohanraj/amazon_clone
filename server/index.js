const express = require("express");

const authRouter = require("./routes/auth");
const { default: mongoose } = require("mongoose");

const app = express();

const PORT = 3000;
const DB_uri =
  "mongodb+srv://reinmohanraj:Mohan123@cluster0.ktl5zwq.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(authRouter);

mongoose
  .connect(DB_uri)
  .then(() => {
    console.log("Connected Successfully!");
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Connected to the PORT : ${PORT}`);
});
