const express = require('express');
const router = express.Router();

const {
    createTask,
    updateTask,
    getTasks,
    deleteTask
} = require('../controllers/taskController');


router.route('/task/new').post(createTask);

router.route('/task/:id')
                        .put(updateTask)
                        .delete(deleteTask);

router.route('/tasks').get(getTasks)

module.exports = router