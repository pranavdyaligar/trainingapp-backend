const express = require("express");
const cors = require("cors");

require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const moduleRoutes = require("./routes/moduleRoutes");

app.use("/api/users", userRoutes);
app.use("/api/modules", moduleRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});