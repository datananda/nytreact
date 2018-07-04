const db = require("../models");

module.exports = {
    create: (req, res) => {
        db.Article
          .create(req.body)
          .then(data => res.json(data))
          .catch(err => res.status(400).json(err));
    },
    findAll: (req, res) => {
        db.Article
          .find({})
          .then(data => res.json(data))
          .catch(err => res.status(400).json(err));
    },
    remove: (req, res) => {
        db.Article
          .findById(req.params.id)
          .then(data => data.remove())
          .then(data => res.json(data))
          .catch(err => res.status(400).json(err));
    }
}