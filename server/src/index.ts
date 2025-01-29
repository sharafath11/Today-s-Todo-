import express from 'express';
import mongoose from 'mongoose';
import todoRoute from './Routs';
import cors from "cors"
const mongoURI = 'mongodb://localhost:27017/react-todo';
mongoose
  .connect(mongoURI)
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/",todoRoute)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
