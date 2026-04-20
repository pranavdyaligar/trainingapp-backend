const express = require("express");
const cors = require("cors");

require("./db");

const app = express();


app.use(cors({ origin: "*" }));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend is running");
});


const moduleRoutes = require("./routes/moduleRoutes");

app.use("/api/modules", moduleRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});