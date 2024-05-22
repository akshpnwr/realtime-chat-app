import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './router/auth.routes.js'
import connectDB from './db/connect.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on http://localhost:${PORT}`);
});
