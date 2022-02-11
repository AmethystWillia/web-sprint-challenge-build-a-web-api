const express = require('express');

const Projects = require('./projects-model');
const { validateProjectId } = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

module.exports = router;