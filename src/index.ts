import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index";
const app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

async function main() {
  app.get("/", (_, res) => {
    res.json({ message: `HouseManagement API.CORS: ${process.env.ORIGIN}` });
  });

  app.use("/", routes);

  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is up and running`);
  });
}

main().catch((e) => {
  throw e;
});
