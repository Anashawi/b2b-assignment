const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const path = require("path");

const swaggerDocument = YAML.load(
  path.join(__dirname, "../swagger/swagger.yaml")
);

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.json({ ok: true }));
module.exports = app;
