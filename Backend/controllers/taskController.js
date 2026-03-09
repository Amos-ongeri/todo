import { Tasks, Completed_tasks } from '../models/task.js';

export const createTask = async (req, res) => {
    try {
        const { task, note } = req.body;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const exists = await Tasks.findOne({
            task: task,
            createdAt: { $gte: today }
        });
        if (exists) {
            return res.status(400).json({ error: 'task already exists' });
        }
        const create = await Tasks.create({
            task: task,
            note: note,
            completed: false
        });
        res.status(201).json(create);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const moveTaskToCompleted = async (req, res) => {
    try {
        const task = await Tasks.findById(req.params.id);
        if (!task) {
            return res.status(400).json({ error: 'Task not Found' });
        }
        await Completed_tasks.findOneAndUpdate(
            { task: task.task, note: task.note },
            {
                $setOnInsert: {
                    task: task.task,
                    note: task.note,
                    completed: true
                }
            },
            { upsert: true, new: true, runValidators: true }
        );
        await Tasks.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'task moves to completed' });
    } catch (err) {
        res.status(500).json({ message: 'server error', error: err.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const task = await Tasks.find();
        if (!task) {
            return res.status(404).json({ error: 'tasks not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCompletedTasks = async (req, res) => {
    try {
        const complete = await Completed_tasks.find();
        if (!complete) {
            return res.status(404).json({ error: 'completed tasks not found' });
        }
        res.json(complete);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const clearCompleted = async (req, res) => {
    try {
        await Completed_tasks.deleteMany({ completed: true });
        res.status(200).json({ message: 'history deleted' });
    } catch (err) {
        res.status(500).json({ error: 'something went wrong' });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, note, completed } = req.body;
        const updated = await Tasks.findByIdAndUpdate(
            id,
            { $set: { task, note, completed } },
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Tasks.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
