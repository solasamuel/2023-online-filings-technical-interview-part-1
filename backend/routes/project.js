const express = require('express');
const router = express.Router();

const {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
    assignTaskToProject,
    filterTasksByProjectName,
    getProjectsAndSortByDueDate,
    getProjectsAndSortByStartDate
} = require('../controllers/projectController');


router.route('/project/new').post(createProject);

router.route('/projects').get(getProjects);

router.route('/project/:id')
                            .put(updateProject)
                            .delete(deleteProject);

router.route('/project/new').post(createProject);

router.route('/project/assignTask').post(assignTaskToProject);

router.route('/project/tasks').post(filterTasksByProjectName);

router.route('/project/sort/startDate').get(getProjectsAndSortByStartDate);
router.route('/project/sort/dueDate').get(getProjectsAndSortByDueDate);

module.exports = router;