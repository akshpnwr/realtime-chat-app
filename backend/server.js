import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './router/auth.routes.js'
import connectDB from './db/connect.js';
import 'express-async-handler';
import { errorHandler } from './middleware/errorMiddleware.js';
import { notFound } from './middleware/not-found.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json())

app.use('/api/auth', authRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server started on http://localhost:${PORT}`);
});
