import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { dbConnect } from './src/config/mongoose';
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`Server is  running on por ${port} 🚀`);
});

dbConnect();
