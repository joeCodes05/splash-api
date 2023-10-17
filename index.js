const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/users/user.routes");
// const fileUpload = require('exp')

const app = express();
app.use(cors("*"));
app.use(express.json({ urlencoded: 40867 }));
const PORT = process.env.PORT || 5000;
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
