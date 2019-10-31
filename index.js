const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

app.use(express.json({ extended: false }));

// CORS access to the server
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Person Application");
});

app.use("/api/persons", require("./routes/api/persons"));

const port = process.env.PORT || 3000;
const host = "127.0.0.1";

app.listen(port, () => {
  console.log(`Server is running at ${host}: ${port}`);
});
