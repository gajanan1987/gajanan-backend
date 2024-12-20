const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

//configure dotenv
dotenv.config();

//rest Object
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/student", require("./routes/studentsRoute.js"));
app.use("/api/v1/auth", require("./routes/authRouter.js"));

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`.white.bgMagenta);
});
