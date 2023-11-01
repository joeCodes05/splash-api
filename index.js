const express = require("express");
const cors = require("cors");

// routes
const authRoutes = require("./routes/auth/auth.routes");

const app = express();
app.use(cors("*"));

app.use("/api/auth", authRoutes);

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cors("*", corsOptions));
app.use(express.json({ urlencoded: 30867, limit: "25mb", extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Content-Type", "application/json");
  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
