import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//Connecet to MongoDb
connectDB();

//Middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

//home
app.get("/", (req, res) => {
  res.send("<h1>Contact Management Application</h1>")
})
app.use("/contacts", contactRoutes);

//Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} node on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Error:${err.message}`);
  process.exit(1);
});
