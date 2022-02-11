const express = require('express');
const res = require('express/lib/response');
const server = express();

server.use(express.json());

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

res.send('<h2>Here we go again</h2>')

module.exports = server;
