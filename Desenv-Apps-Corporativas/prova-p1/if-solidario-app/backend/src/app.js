const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const eventRoutes = require("./routes/event.routes");
const volunteerRoutes = require("./routes/volunteer.routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de Voluntariado funcionando",
    docs: "/api-docs",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/events", eventRoutes);
app.use("/volunteers", volunteerRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
