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

    // checks if a project with the same name exists and throws an error
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
 * => /api/project/:id
 * 
 * Throws an error if project does not exist
 */
exports.updateProject = catchAsyncErrors(async (req, res, next) => {

    var project = await Project.findById(req.params.id);

    // checks if project exists
    if (!project) {
        return next(new ErrorHandler('Project not found', 404))
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndNotify: false,
    })

    res.status(200).json({
        success: true,
        project
    })
})


/**
 * Delete an existing project and return it if
 * request is successful
 * 
 * => /api/project/:id
 * 
 * Throws an error if project does not exist
 */
exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
    var project = await Project.findById(req.params.id);

    // checks if a project with the same name exists and throws an error
    if (!project) {
        return next(new ErrorHandler('Project not found', 404))
    }

    try {
        await Project.findByIdAndDelete(project._id)
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler('Project not found', 404))
    }

    res.status(204).json({
        success: true,
        message: 'Project is deleted.'
    })
})