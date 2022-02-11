const express = require('express');

const Actions = require('./actions-model');
const { validateActionId, validateAction } = require('./actions-middlware');

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

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            next(err);
        });
});

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    const { id } = req.params;

    Actions.update(id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        });
});

router.delete('/:id', validateActionId, (req, res, next) => {
    const { id } = req.params;

    Actions.get(id)
        .then(action => {
            res.status(200).json(action);
            return Actions.remove(id);
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;