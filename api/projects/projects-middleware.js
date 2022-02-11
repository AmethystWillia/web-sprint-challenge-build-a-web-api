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

module.exports = {
    validateProjectId,
};