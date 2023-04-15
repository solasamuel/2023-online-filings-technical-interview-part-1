const express = require('express');
const router = express.Router();

const {
    createProject,
} = require('../controllers/projectController');


router.route('/project/new').post(createProject);


module.exports = router