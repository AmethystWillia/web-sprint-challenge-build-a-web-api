const express = require('express');
const server = express();

server.use(express.json());

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send('<h2>Here we go again</h2>')
});

module.exports = server;
