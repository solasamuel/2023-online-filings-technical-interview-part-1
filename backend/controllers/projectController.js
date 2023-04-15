const Project = require('../models/project');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

/**
 * Create a new project and return newly created
 * project if successful
 * 
 * => /api/project/new
 * 
 * Throws errors if a project with the same name
 * exists
 */
exports.createProject = catchAsyncErrors(async (req, res, next) => {

    const existing = await Project.findOne({ name: req.body.name });

    // checks if tasks with the same name existing are throws an error
    if (existing) {
        return next(new ErrorHandler('Project with the same name already exists', 400))
    }

    const { name, startDate, dueDate } = req.body;

    const project = await Project.create({
        name,
        startDate,
        dueDate
    })

    res.status(201).json({
        success: true,
        project
    })

})

/**
 * Get all projects
 * 
 * => /api/projects
 */
exports.getProjects = catchAsyncErrors(async (req, res, next) => {

    let projects = await Project.find();

    res.status(200).json({
        success: true,
        projects
    })
})


/**
 * Update an existing project and return it if
 * request is successful
 * 
 * => /api/task/:id
 * 
 * Throws an error if project does not exist
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