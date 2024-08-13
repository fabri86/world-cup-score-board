import express from "express";

const app = express();
const PORT = 5000;

app.listen(PORT, () =>
  console.log(`The World Cup server is running on port ${PORT}`)
);
