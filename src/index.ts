import cors from "cors";
import express, { Application } from "express";

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

import { corsOptions } from "./configs/corsOp";

const app: Application = express();

app.get("/", (_, res) => {
  res.status(200).json({
    status: 200,
    message: "Seja Bem-vindo a Smart Plant API",
    data: {},
  });
});

app.use(express.json());

app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
