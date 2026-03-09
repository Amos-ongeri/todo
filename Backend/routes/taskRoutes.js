import express from 'express';
import { createTask, moveTaskToCompleted, getTasks, getCompletedTasks, clearCompleted, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/task', createTask);
router.post('/tasks/:id/completed', moveTaskToCompleted);
router.get('/tasks', getTasks);
router.get('/completed', getCompletedTasks);
router.delete('/clear', clearCompleted);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
