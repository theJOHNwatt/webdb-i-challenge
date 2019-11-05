const express = require('express');
const knex = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    knex
    .select('*')
    .from('accounts')
    .then(acc => {
        res.status(200).json(acc);
    })
    .catch(err => {
        res.status(500).json({error: 'Failed to get accounts from database'});
    });
});

server.get('/:id', (req, res) => {
    knex
    .select('*')
    .from('accounts')
    .where('id', '=', req.params.id)
    .then(acc => {
        res.status(200).json(acc);
    })
    .catch(err => {
        res.status(500).json({error: 'Failed to find account with that ID'});
    });
});

server.post('/', (req,res) => {
    knex
    .insert(req.body)
    .into('accounts')
    .then(acc => {
        res.status(201).json(acc);
    })
    .catch(err => {
        res.status(500).json({error: 'Failed to post new account'})
    })
})

server.put('/:id', (req, res) => {
    const changes = req.body;
    knex('accounts')
    .where({id : req.params.id})
    .update(changes)
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        res.status(500).json({error: 'Failed to update account'})
    })
})

server.delete('/:id', (req, res) => {
    knex('accounts')
    .where({id: req.params.id})
    .del()
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        res.status(500).json({error:'Failed to delete account'})
    })
})

module.exports = server;