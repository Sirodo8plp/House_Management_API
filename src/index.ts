import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index";
const app = express();
const corsOptions = {
  origin: process.env.ORIGIN || "http://localhost:3000",
};
const PORT = process.env.PORT || 4000;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

async function main() {
  app.get("/", (_, res) => {
    res.json({ message: "HouseManagement API." });
  });

  app.use("/", routes);

  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is up and running`);
  });
}

main().catch((e) => {
  throw e;
});
