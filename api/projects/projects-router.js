const express = require('express');

const Projects = require('./projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');

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

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            next(err);
        });
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    const { id } = req.params;

    Projects.update(id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            next(err);
        })
});

router.delete('/:id', validateProjectId, (req, res, next) => {
    const { id } = req.params;

    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
            return Projects.remove(id);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;