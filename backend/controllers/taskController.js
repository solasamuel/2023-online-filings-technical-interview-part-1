const Task = require('../models/task');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


/**
 * Create a new task and return newly created
 * task if successful
 * 
 * => /api/v1/task/new
 * 
 * Throws errors if a task with the same name
 * exist
 */
exports.createTask = catchAsyncErrors(async (req, res, next) => {

    const existing = await Task.findOne({ name: req.body.name });

    // checks if tasks with the same name existing are throws an error
    if (existing) {
        return next(new ErrorHandler('Task with the same name already exists', 400))
    }

    const { name, status, startDate, dueDate, doneDate, project } = req.body;

    try {
        const task = await Task.create({
            name,
            status,
            startDate,
            dueDate,
            doneDate,
            project
        })

        res.status(201).json({
            success: true,
            task
        })
    } catch (error) {
        console.log(error)
    }
})

/**
 * Update an existing task and return it if
 * request is successful
 * 
 * => /api/v1/task/:id
 * 
 * Throws an error if task does not exist
 */
exports.updateTask = catchAsyncErrors(async (req, res, next) => {

    var task = await Task.findById(req.params.id);

    // checks if tasks with the same name existing are throws an error
    if (!task) {
        return next(new ErrorHandler('Task not found', 404))
    }

    const { name, status, startDate, dueDate, doneDate, project } = req.body;

    try {
        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndNotify: false,
        })

        res.status(200).json({
            success: true,
            task
        })
    } catch (error) {
        console.log(error)
    }
})

/**
 * Get all tasks
 * 
 * => /api/v1/tasks
 */
exports.getTasks = catchAsyncErrors(async (req, res, next) => {

    try {
        const tasks = await Task.find();

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        console.log(error);
    }

})