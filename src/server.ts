import express from "express";
import { sequelize } from "./database";
import { adminJS, adminJsRouter } from "./adminjs";
import { router } from "./routes";

const app = express();

app.use(adminJS.options.rootPath, adminJsRouter);
app.use(express.json())
app.use(express.static("public"));
app.use(router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection successfully");
  } catch (e) { 
    console.log("Erro");
  }

  console.log("Server started sucessfully");
});

