const express = require('express');
const router = express.Router();

const {
    createProject,
    getProjects,
    updateProject,
    deleteProject,
    assignTaskToProject,
} = require('../controllers/projectController');


router.route('/project/new').post(createProject);

router.route('/projects').get(getProjects);

router.route('/project/:id')
                            .put(updateProject)
                            .delete(deleteProject);

router.route('/project/new').post(createProject);

router.route('/project/assignTask').post(assignTaskToProject)

module.exports = router;