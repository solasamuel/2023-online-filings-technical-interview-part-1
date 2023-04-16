const Project = require('../models/project');
const Task = require('../models/task');
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
        return next(new ErrorHandler('Project not found', 404));
    }

    try {
        // select tasks for reset
        var tasksAssigned = Task.find({ project: project._id });

        await Project.findByIdAndDelete(project._id);

        // reset through map
        (await tasksAssigned).map(async (task) => {
            var resetTask = await Task.findByIdAndUpdate(task._id, { project: null }, {
                new: true,
                runValidators: true,
                useFindAndNotify: false,
            })
            return resetTask;
        })

        
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler('Project not found', 404));
    }

    res.status(204).json({
        success: true,
        message: 'Project is deleted'
    })
})

/**
 * Assign an existing task to a project and return them if
 * request is successful
 * 
 * => /api/project/assignTask
 * 
 * Throws an error if project or task do not exist
 */
exports.assignTaskToProject = catchAsyncErrors(async (req, res, next) => {

    var project = await Project.findById(req.body.project);

    // checks if project exists
    if (!project) {
        return next(new ErrorHandler('Project not found', 404))
    }
    
    var task = await Task.findById(req.body.task);

    // checks if task exists
    if (!task) {
        return next(new ErrorHandler('Task not found', 404))
    }

    task = await Task.findByIdAndUpdate(req.body.task, { project: project._id }, {
        new: true,
        runValidators: true,
        useFindAndNotify: false,
    })

    res.status(200).json({
        success: true,
        project,
        task
    })
})

/**
 * Get all tasks with a matching project name and return them if
 * request is successful
 * 
 * => /api/project/filter/:projectName
 * 
 * Throws an error if project by the name does not exist
 */
exports.filterTasksByProjectName = catchAsyncErrors(async (req, res, next) => {

    const apiFeatures = new APIFeatures(Project.find(), { name: req.body.project })
        .search()
        .filter()
    var project = await apiFeatures.query;

    // checks if project exists
    if (!project) {
        return next(new ErrorHandler('Project not found', 404))
    }

    var tasks = await Task.find({ project: project._id });

    res.status(200).json({
        success: true,
        project,
        tasks
    })
})

/**
 * Get all projects and sort them by start date
 * 
 * => /api/projects/sort/startDate
 */
exports.getProjectsAndSortByStartDate = catchAsyncErrors(async (req, res, next) => {

    let projects = await Task.find();

    projects = projects.sort((a, b) => {
        return a.startDate >= b.startDate
            ? 1
            : -1
    })

    res.status(200).json({
        success: true,
        projects
    })
})

/**
 * Get all projects and sort them by due date
 * 
 * => /api/projects/sort/dueDate
 */
exports.getProjectsAndSortByDueDate = catchAsyncErrors(async (req, res, next) => {

    let projects = await Task.find();

    projects = projects.sort((a, b) => {
        return a.startDate >= b.dueDate
            ? 1
            : -1
    })

    res.status(200).json({
        success: true,
        projects
    })
})


