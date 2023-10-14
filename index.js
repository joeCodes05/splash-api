require("dotenv").config();
const express = require('express');
const userRouter = require('./api/modules/users/routers/user.router');
const app = express();

const PORT = process.env.API_PORT;

app.use(express.json());
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
})