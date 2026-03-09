import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    note:{
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        enum:[true, false]
    }
},
{timestamps: true});

const Tasks = mongoose.model('tasks', taskSchema);
const Completed_tasks = mongoose.model('completed_tasks', taskSchema);

export { Tasks, Completed_tasks };
