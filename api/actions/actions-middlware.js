const Actions = require('./actions-model');

const validateActionId = (req, res, next) => {
    const { id } = req.params;

    Actions.get(id)
        .then(result => {
            if (result === null || result === undefined) {
                res.status(404).json({ message: `Action with id ${id} was not found` })
            } else {
                req.action = result;
                next();
            }
        })
        .catch(err => {
            next(err);
        });
};

const validateAction = (req, res, next) => {
    const { project_id, description, notes, completed } = req.body;

    if (project_id === undefined || description === undefined || notes === undefined || completed === undefined) {
        res.status(400).json({ message: 'Description and notes are required fields' });
    } else if (description.length > 128) {
        res.status(400).json({ message: 'Description length cannot exceed 128 characters' });
    } else {
        next();
    }
};

module.exports = {
    validateActionId,
    validateAction,
};