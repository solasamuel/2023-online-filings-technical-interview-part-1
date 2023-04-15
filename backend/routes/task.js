const express = require('express');
const router = express.Router();

const {
    createTask,
    updateTask,
    getTasks,
    deleteTask,
    getTasksAndSortByStartDate,
    getTasksAndSortByDueDate,
    getTasksAndSortByDoneDate
} = require('../controllers/taskController');


router.route('/task/new').post(createTask);

router.route('/task/:id')
                        .put(updateTask)
                        .delete(deleteTask);

router.route('/tasks').get(getTasks);

router.route('/tasks/sort/startDate').get(getTasksAndSortByStartDate);

router.route('/tasks/sort/dueDate').get(getTasksAndSortByDueDate);

router.route('/tasks/sort/doneDate').get(getTasksAndSortByDoneDate);

module.exports = router