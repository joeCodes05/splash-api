// require("./config/database.config");
const express = require("express");
const cors = require("cors");
const serviceRoutes = require("./routes/service.route");

const app = express();

app.use(cors("*"));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/services", serviceRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
