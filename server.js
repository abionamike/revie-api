import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import configDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import imageRoute from './routes/imageRoute.js';

const app = express();

configDB();

app.use(express.json());

app.get('/api', (req, res) => {
  res.send("Welcome to revie's API");
});

app.use('/api/users', userRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/uploads', imageRoute);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'upload/images')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));