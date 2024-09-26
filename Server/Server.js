const express = require("express");

const connectionDB = require("./config/db");
const path = require("path");

const customerRoutes = require("./routes/CustomerRoutes");
const groundRoutes = require("./routes/GroundRoutes");
const bookRouter = require("./routes/BookingRoutes");
const credentialsRoutes = require("./routes/CredentialsRoutes");

const cors = require("cors");

const corsOptions = {
  methods: "GET,POST,PUT,DELETE",
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"],
};

const server = express();
server.use(cors(corsOptions));

connectionDB();
server.use(express.json());

const PORT = 3000;

server.use("/api/customers", customerRoutes);
server.use("/api/grounds", groundRoutes);
server.use("/api/booking", bookRouter);
server.use("/api/auth", credentialsRoutes);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
