import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
import cors from 'cors';

app.use(cors({
  origin: "https://panscience-taskmanager-1.onrender.com", // your frontend origin
  credentials: true
}));


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
