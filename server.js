import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { mongoConnect } from "./src/config/dbConfig.js";

const app = express();

const PORT = process.env.PORT || 8000;
// console.log(process.env.PORT);

//use middlewares
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());

//connect to database
mongoConnect();

//apis
import registerLoginRouter from "./src/routers/registerLogin.js";
app.use("/api/v1/register-login", registerLoginRouter);

app.get("/", (req, res) => {
  //   res.json({
  //     message: "you reach e-commerce api",
  //   });
  res.send("<h1>hi there</h1>");
});

//custom global error handler
app.use((error, req, res) => {
  console.log(error.message);
  const status = error.status || 404;
  res.status(status).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running at http://localhost:${PORT}`);
});
