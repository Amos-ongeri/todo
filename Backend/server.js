import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
import taskRoutes from './routes/taskRoutes.js';
import assistantRoutes from './routes/assistant.js';
import { Tasks, Completed_tasks } from './models/task.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

connectDB();

app.use('/', taskRoutes);
app.use('/', assistantRoutes);

// Analytics route: returns completed and current task counts
app.get('/api/analytics', async (req, res) => {
  try {
    const completedCount = await Completed_tasks.countDocuments();
    const currentCount = await Tasks.countDocuments();
    res.json({ completedCount, currentCount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics', details: err.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
