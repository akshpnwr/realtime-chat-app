import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoutes from './router/auth.routes.js'
import messageRoutes from './router/message.routes.js'
import connectDB from './db/connect.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { notFound } from './middleware/not-found.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server started on http://localhost:${PORT}`);
});
