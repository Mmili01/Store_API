require("dotenv").config();

require("express-async-errors");
const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const notFound = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productRouter);
//products route

app.use(notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
port === 3000;

// console.log("this is strange")
const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONG0_URI);
    app.listen(port, console.log(`server is listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
