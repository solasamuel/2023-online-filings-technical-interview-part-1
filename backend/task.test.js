const request = require('supertest');
const app = require('./app');
const Task = require('./models/task');
const mongoose = require('mongoose');

describe('Task API', () => {
    let task;

    beforeAll(async () => {
        // Connect to test database and create a test task
        await mongoose.connect(process.env.DB_LOCAL_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        task = await Task.create({
            name: 'Test Task',
            status: 'To-do',
            startDate: new Date(),
            dueDate: new Date(Date.now() + 86400000),
        });
    });

    afterAll(async () => {
        // Delete the test task and disconnect from database
        await Task.findByIdAndDelete(task._id);
        await mongoose.disconnect();
    });

    it('should create a new task', async () => {
        // arrange
        const testTaskData = {
            name: 'New Task',
            status: 'To-do',
            startDate: new Date(),
            dueDate: new Date(Date.now() + 86400000),
        }

        // act
        const res = await request(app)
            .post('/api/task/new')
            .send(testTaskData);

        // assert
        expect(res.statusCode).toEqual(201);
        expect(res.body.task.name).toEqual('New Task');
        expect(res.body.task.status).toEqual('To-do');
        expect(res.body.task.startDate).toBeDefined();
        expect(res.body.task.dueDate).toBeDefined();

        await Task.findByIdAndDelete(res.body.task._id);
    });

    it('should get all tasks', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toEqual(200);
        expect(res.body.tasks.length).toBeGreaterThan(0);
    });

    it('should update a task', async () => {
        const res = await request(app)
            .put(`/api/task/${task._id}`)
            .send({
                name: 'Updated Task',
                status: 'Done',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.task.name).toEqual('Updated Task');
        expect(res.body.task.status).toEqual('Done');
    });


});
