# 2023-online-filings-technical-interview-part-1

This is an attempt at the OnlineFilings technical interview with vanilla js in a MERN stack.

## Installation

Use node package manager to install.

```bash
npm install
```

## Usage

```bash
npm run start
```

## Documentation

The endpoints served by the Task web api are as below:

a.  create a task - /api/task/new - post

b.  list all tasks - /api/tasks - get

c.  edit a task - /api/task/:id - put

d.  delete a task - /api/task/:id - delete

e.  mark a task as to-do/done - /api/task/:id  - put

f.  filter tasks by status - /api/tasks?status=xxxxx  - get

g.  search tasks by name - /api/tasks?keyword=xxxxx - get

h.  sort tasks by dates i.  start date  - /api/tasks/sort/startDate - get

ii.  due date - /api/tasks/sort/dueDate - get

iii.  done date - /api/tasks/sort/doneDate - get



The endpoints served by the Project web api are as below:

a.  create a project - /api/project/new - post

b.  list all projects - /api/projects - get

c.  edit a project - /api/task/:id - put

d.  delete a project - /api/task/:id - delete

e.  assign a task to a project - /api/project/assignTask

f.  filter tasks by project name - /api/project/filter - post

g.  sort projects by dates i.  start date - /api/project/sort/startDate - get

ii.  due date - /api/project/sort/dueDate - get

## Assumptions

1. We have projects that start independently of the first tasks's start date and end independently of the last task's due date.

2. The tasks are all related to a single user/entity. If we want to store multiple tasks for multiple users we would add a user property to the task schema and also check if a task with the same name and user exists.

3. For filtering tasks by project name, we assume two projects cannot have the same name.


## Testing

```bash
npm run test
```