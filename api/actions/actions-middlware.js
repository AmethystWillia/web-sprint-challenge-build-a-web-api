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

module.exports = {
    validateActionId,
};