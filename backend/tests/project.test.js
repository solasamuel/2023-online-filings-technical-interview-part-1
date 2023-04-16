const request = require('supertest');
const app = require('../app');
const Project = require('../models/project');
const Task = require('../models/task');
const mongoose = require('mongoose');

describe('Project API', () => {
    let project;

    beforeAll(async () => {
        // Connect to test database and create a test task
        await mongoose.connect(process.env.DB_LOCAL_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        project = await Project.create({
            name: 'Test Project',
            startDate: new Date(),
            dueDate: new Date(Date.now() + 86400000),
        });
    });

    afterAll(async () => {
        // Delete the test task and disconnect from database
        await Project.findByIdAndDelete(project._id);
        await mongoose.disconnect();
    });

    it('should create a new project', async () => {
        // arrange
        const testProjectData = {
            name: 'New Project',
            startDate: new Date(),
            dueDate: new Date(Date.now() + 86400000),
        }

        // act
        const res = await request(app)
            .post('/api/project/new')
            .send(testProjectData);

        // assert
        expect(res.statusCode).toEqual(201);
        expect(res.body.project.name).toEqual('New Project');
        expect(res.body.project.startDate).toBeDefined();
        expect(res.body.project.dueDate).toBeDefined();

        await Project.findByIdAndDelete(res.body.project._id);
    });

    it('should get all projects', async () => {
        // act
        const res = await request(app).get('/api/projects');

        // assert
        expect(res.statusCode).toEqual(200);
        expect(res.body.projects.length).toBeGreaterThan(0);
    });

    it('should update a project', async () => {
        // arrange
        const testUpdateData = {
            name: 'Updated Project'
        }

        // act
        const res = await request(app)
            .put(`/api/project/${project._id}`)
            .send(testUpdateData);

        // assert
        expect(res.statusCode).toEqual(200);
        expect(res.body.project.name).toEqual('Updated Project');
    });

    it('should delete a project', async () => {
        const res = await request(app).delete(`/api/project/${project._id}`);
        expect(res.statusCode).toEqual(204);
        const deletedProject = await Project.findById(project._id);
        expect(deletedProject).toBeNull();
    });

    it('should assign a task to a project', async () => {
        // arrange
        var project = await Project.create({
            name: "technical interview"
        });

        var task = await Task.create({
            status: "Done",
            name: "set up development environment",
        });

        const requestData = {
            project: project._id,
            task: task._id
        }

        // act
        const res = await request(app)
            .post('/api/project/assignTask')
            .send(requestData);

        // assert
        expect(res.statusCode).toEqual(200);
        expect(res.body.project.name).toEqual('technical interview');
        expect(res.body.task.project).toMatch(/[0-9a-fA-F]{24}/);

        await Task.findByIdAndDelete(res.body.task._id);
        await Project.findByIdAndDelete(res.body.project._id);

    });

    it('should reset tasks when a project is deleted', async () => {
        // arrange
        var project = await Project.create({
            name: "morning routine"
        });

        var task = await Task.create({
            status: "To-do",
            name: "shower",
        });

        const requestData = {
            project: project._id,
            task: task._id
        }

        // act
        const assignRes = await request(app)
            .post('/api/project/assignTask')
            .send(requestData);

        const deleteRes = await request(app)
            .delete(`/api/project/${assignRes.body.project._id}`)
            .send(requestData);

        // assert
        expect(assignRes.statusCode).toEqual(200);
        expect(assignRes.body.project.name).toEqual('morning routine');
        expect(assignRes.body.task.project).toMatch(/[0-9a-fA-F]{24}/);

        expect(deleteRes.statusCode).toEqual(204);

        const tasksStillAssigned = await Task.find({ project: assignRes.body.project._id })
        expect(tasksStillAssigned.length).toEqual(0);

        await Task.findByIdAndDelete(assignRes.body.task._id);
        await Project.findByIdAndDelete(assignRes.body.project._id);

    });

    // it('should filter tasks by project name', async () => {
    //     // arrange
    //     var project = await Project.create({
    //         name: "morning routine"
    //     });

    //     var task1 = await Task.create({
    //         status: "To-do",
    //         name: "brush my teeth",
    //     });

    //     var task2 = await Task.create({
    //         status: "To-do",
    //         name: "shower",
    //     });

    //     const requestData1 = {
    //         project: project._id,
    //         task: task1._id
    //     }

    //     const requestData2 = {
    //         project: project._id,
    //         task: task2._id
    //     }

    //     const requestData3 = {
    //         project: "morning routine"
    //     }

    //     // act
    //     const assignRes1 = await request(app)
    //         .post('/api/project/assignTask')
    //         .send(requestData1);

    //     const assignRes2 = await request(app)
    //         .post('/api/project/assignTask')
    //         .send(requestData2);

    //     const filterRes = await request(app)
    //         .get(`/api/project/tasks`)
    //         .send(requestData3);

    //     // assert
    //     expect(assignRes1.statusCode).toEqual(200);
    //     expect(assignRes1.body.project.name).toEqual('morning routine');
    //     expect(assignRes1.body.task.project).toMatch(/[0-9a-fA-F]{24}/);

    //     expect(assignRes2.statusCode).toEqual(200);
    //     expect(assignRes2.body.project.name).toEqual('morning routine');
    //     expect(assignRes2.body.task.project).toMatch(/[0-9a-fA-F]{24}/);

    //     expect(filterRes.statusCode).toEqual(200);
    //     expect(filterRes.body.tasks.length).toEqual(2);

    //     await Task.findByIdAndDelete(assignRes1.body.task._id);
    //     await Task.findByIdAndDelete(assignRes2.body.task._id);
    //     await Project.findByIdAndDelete(assignRes1.body.project._id);

    // });

});
