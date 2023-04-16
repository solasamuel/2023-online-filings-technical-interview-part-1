const db = client.db("todoList");
const tasks = db.collection("tasks");
const projects = db.collection("projects");

const pipeline = [
    { $match: { dueDate: new Date() } }
];


const tasksAggCursor = tasks.aggregate(pipeline);
for await (const doc of tasksAggCursor) {
    console.log(doc);
}

const projectsAggCursor = projects.aggregate(pipeline);
for await (const doc of projectsAggCursor) {
    console.log(doc);
}