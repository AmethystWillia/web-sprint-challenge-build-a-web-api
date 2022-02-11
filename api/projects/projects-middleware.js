const Projects = require('./projects-model');

const validateProjectId = (req, res, next) => {
    const { id } = req.params;

    Projects.get(id)
        .then(result => {
            if (result === null || result === undefined) {
                res.status(404).json({ message: `Could not find project of id ${id}` });
            } else {
                req.project = result;
                next();
            }
        })
        .catch(err => {
            next(err);
        })
};

const validateProject = (req, res, next) => {
    const { name, description } = req.body;

    if (name === null || name === undefined || description === null || description === undefined) {
        res.status(400).json({ message: 'Name and description are required' });
    } else {
        next();
    }
};

module.exports = {
    validateProjectId,
    validateProject,
};