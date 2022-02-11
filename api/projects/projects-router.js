const express = require('express');

const Projects = require('./projects-model');
//const {} = require('./projects-middleware');

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

module.exports = router;