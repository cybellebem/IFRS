const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/auth.routes");
const publicRoutes = require("./routes/public.routes");
const protectedRoutes = require("./routes/protected.routes");
const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/public", publicRoutes);
app.use("/protected", protectedRoutes);
module.exports = app;
