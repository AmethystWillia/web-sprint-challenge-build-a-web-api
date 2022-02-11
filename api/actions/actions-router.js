const express = require('express');

const Actions = require('./actions-model');
const { validateActionId } = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            next(err);
        });
});

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

module.exports = router;