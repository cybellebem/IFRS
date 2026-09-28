const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specification = require("./config/swagger");
const productsRoutes = require("./routes/products.routes");
const app = express();
app.use(express.json());
app.get("/openapi.json", (req, res) => {
  res.json(specification);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specification));
app.use("/api/products", productsRoutes);
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint não encontrado.",
  });
});
module.exports = app;
