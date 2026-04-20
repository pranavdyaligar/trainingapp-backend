const express = require("express");
const cors = require("cors");
require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const userRoutes = require("./routes/userRoutes");
const moduleRoutes = require("./routes/moduleRoutes");

app.use("/api/users", userRoutes);
app.use("/api/modules", moduleRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working");
});

// PORT FIX (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});