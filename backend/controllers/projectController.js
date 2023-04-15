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
 * exist
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