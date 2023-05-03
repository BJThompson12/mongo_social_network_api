const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
  // /api/users

  // TEST route
  // testRoute(req, res) {
  //   console.log('i made it');
  // },

  //POST a new user
  createUser(req, res) {
  User.create(req.body)
  .then((user) => res.json(user))
  .catch((err) => res.status(500).json(err))
  },

  // GET all Users
getAllUsers(req, res){
User.find()
.then((user) => res.json(user))
.catch((err) => res.status(500).json(err))
},
  // GET a single user by _id
getUserByID(req, res){
  User.findById(req.params.id)
  .then((user) => res.json(user))
  .catch((err) => res.status(500).json(err))
},
  // PUT to update a user by its _id
  updateUserByID(req, res){
    User.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {runValidators: true, new: true}
      )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  },
  // DELETE to remove a user byt its _id
  deleteUserByID(req, res){
    User.findByIdAndDelete(
      {_id: req.params.id},
      {runValidators: true, new: true}
      )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
  },
}