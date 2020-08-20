import express from "express";
import morgan from "morgan";
import routes from "./routes/index";

const app = express();

// setting morgan log to dev
console.log("App_Env:", process.env.NODE_ENV);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(routes.reward);
app.use(routes.property);

export default app;
