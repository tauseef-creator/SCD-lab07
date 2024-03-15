const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`
        <h1>Hello World!</h1>
        <a href="/about"><button>Go to About Page</button></a>
    `);
});

app.get('/about', (req, res) => {
    res.send(`
        <h1>About page</h1>
        <a href="/"><button>Go to Home Page</button></a>
    `);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});