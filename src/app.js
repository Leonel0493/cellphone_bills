import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth/auth.routes.js";
import brandsRoutes from "./routes/catalogs/brands.routes.js";
import pkg from "../package.json" assert { type: "json" };

const app = express();

// * setting express variable
app.set("pkg", pkg);

// * enabled json
app.use(express.json());

// * start morgan for server
app.use(morgan("dev"));

// TODO: add routes

app.use("/api/auth", authRoutes);
app.use("/api/brands", brandsRoutes);

app.use("/", (req, res) => {
  res.json({
    project: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

export default app;
