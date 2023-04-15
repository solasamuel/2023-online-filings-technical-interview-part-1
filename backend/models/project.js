const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
        default: Date.now
    }
})

module.exports = mongoose.model('Projects', projectSchema)