const Task = require('../models/task');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

/**
 * Create a new task and return newly created
 * task if successful
 * 
 * => /api/task/new
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

})

/**
 * Update an existing task and return it if
 * request is successful
 * 
 * => /api/task/:id
 * 
 * Throws an error if task does not exist
 */
exports.updateTask = catchAsyncErrors(async (req, res, next) => {

    var task = await Task.findById(req.params.id);

    // checks if tasks with the same name existing are throws an error
    if (!task) {
        return next(new ErrorHandler('Task not found', 404))
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndNotify: false,
    })

    res.status(200).json({
        success: true,
        task
    })
})

/**
 * Get all tasks
 * 
 * => /api/tasks
 */
exports.getTasks = catchAsyncErrors(async (req, res, next) => {

    const apiFeatures = new APIFeatures(Task.find(), req.query)
        .search()
        .filter()

    let tasks = await apiFeatures.query

    res.status(200).json({
        success: true,
        tasks
    })
})

/**
 * Delete an existing task and return it if
 * request is successful
 * 
 * => /api/task/:id
 * 
 * Throws an error if task does not exist
 */
exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
    var task = await Task.findById(req.params.id);

    // checks if tasks with the same name existing are throws an error
    if (!task) {
        return next(new ErrorHandler('Task not found', 404))
    }

    try {
        await Task.findByIdAndDelete(task._id)
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler('Task not found', 404))
    }

    res.status(204).json({
        success: true,
        message: 'Task is deleted'
    })
})

/**
 * Get all tasks and sort them by start date
 * 
 * => /api/tasks/sort/startDate
 */
exports.getTasksAndSortByStartDate = catchAsyncErrors(async (req, res, next) => {

    let tasks = await Task.find();

    tasks.sort((a, b) => {
        return a.startDate >= b.startDate
            ? 1
            : -1
    })

    res.status(200).json({
        success: true,
        tasks
    })
})

/**
 * Get all tasks and sort them by due date
 * 
 * => /api/tasks/sort/dueDate
 */
exports.getTasksAndSortByDueDate = catchAsyncErrors(async (req, res, next) => {

    let tasks = await Task.find();

    tasks.sort((a, b) => {
        return a.dueDate >= b.dueDate
            ? 1
            : -1
    })

    res.status(200).json({
        success: true,
        tasks
    })
})

/**
 * Get all tasks and sort them by done date
 * 
 * => /api/tasks/sort/doneDate
 */
exports.getTasksAndSortByDoneDate = catchAsyncErrors(async (req, res, next) => {

    let tasks = await Task.find();

    tasks.sort((a, b) => {
        return a.doneDate >= b.doneDate
            ? 1
            : -1
    })

    res.status(200).json({
        success: true,
        tasks
    })
})