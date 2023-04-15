const request = require('supertest');
const app = require('./app');
const Project = require('./models/project');
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


});
