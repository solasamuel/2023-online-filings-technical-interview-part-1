const express = require('express');
const router = express.Router();

const {
    createProject,
    getProjects,
    updateProject,
    deleteProject
} = require('../controllers/projectController');


router.route('/project/new').post(createProject);

router.route('/projects').get(getProjects);

router.route('/project/:id')
                        .put(updateProject)
                        .delete(deleteProject);

module.exports = router