const express = require('express');
const app = express();
const port = 3000;

let tasks = [];

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <h1>Add Task</h1>
        <form action="/tasks" method="post">
            <label for="title">Title:</label><br>
            <input type="text" id="title" name="title"><br>
            <label for="description">Description:</label><br>
            <textarea id="description" name="description"></textarea><br>
            <label for="dueDate">Due Date:</label><br>
            <input type="date" id="dueDate" name="dueDate"><br>
            <label for="category">Category:</label><br>
            <select id="category" name="category">
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Errands">Errands</option>
            </select><br>
            <label for="completed">Completed:</label><br>
            <input type="checkbox" id="completed" name="completed"><br>
            <label for="priority">Priority:</label><br>
            <select id="priority" name="priority">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select><br>
            <input type="submit" value="Add Task">
        </form>
    `);
});

app.post('/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        category: req.body.category,
        completed: req.body.completed || false,
        priority: req.body.priority
    };
    tasks.push(task);
    res.status(201).send(task);
});

app.get('/tasks', (req, res) => {
    let result = tasks;
    if (req.query.sort) {
        result = [...tasks].sort((a, b) => {
            if (req.query.sort === 'dueDate') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else if (req.query.sort === 'category') {
                return a.category.localeCompare(b.category);
            } else if (req.query.sort === 'completed') {
                return (a.completed === b.completed)? 0 : a.completed? -1 : 1;
            }
        });
    }
    res.send(result);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});