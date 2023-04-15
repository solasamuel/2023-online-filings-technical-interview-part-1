const express = require('express');
const router = express.Router();

const {
    createTask,
    updateTask,
    getTasks
} = require('../controllers/taskController');


router.route('/task/new').post(createTask);

router.route('/task/:id').put(updateTask);

router.route('/tasks').get(getTasks)

module.exports = router