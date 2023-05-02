const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
  // /api/users

  // TEST route
  // testRoute(req, res) {
  //   console.log('i made it');
  // },
  
  // GET all Users
getAllUsers(req, res){
User.find()
.then((user) => res.json(user))
.catch((err) => res.status(500).json(err))
},
  // GET a single user by _id

  //POST a new user
createUser(req, res) {
  User.create(req.body)
  .then((user) => res.json(user))
  .catch((err) => res.status(500).json(err))
}
  // PUT to update a user by its _id

  // DELETE to remove a user byt its _id
}