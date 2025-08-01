import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true
}));


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
