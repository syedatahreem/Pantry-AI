import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("PantryAI API running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
