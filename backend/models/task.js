const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    status: {
        type: String,
        required: [true, 'Select a status for this task'],
        enum: {
            values: [
                'To-do',
                'Done'
            ],
            message: 'Select a status for this task'
        }
    },
    name: {
        type: String,
        required: [true, 'Enter task name'],
        trim: true,
        maxLength: [100, 'Task name cannot exceed 100 characters']
    },
    startDate: {
        type: Date,
        required: [true, 'Enter task start date'],
        default: Date.now
    },
    dueDate: {
        type: Date,
    },
    doneDate: {
        type: Date,
    },
    project: {
        type: String
    },
})

module.exports = mongoose.model('Tasks', taskSchema)