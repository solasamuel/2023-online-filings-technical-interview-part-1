const express = require('express');
const router = express.Router();

const {
    createProject,
    getProjects
} = require('../controllers/projectController');


router.route('/project/new').post(createProject);

router.route('/projects').get(getProjects);

module.exports = router