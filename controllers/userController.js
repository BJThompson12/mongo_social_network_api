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
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)})
},

  // GET all Users
getAllUsers(req, res){
User.find()
.then((user) => res.json(user))
.catch((err) => {
  console.log(err);
  res.status(500).json(err)})
},
  // GET a single user by _id
getUserByID(req, res){
  User.findById(req.params.id)
  .then((user) => res.json(user))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)})
},
  // PUT to update a user by its _id
  updateUserByID(req, res){
    User.findByIdAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {runValidators: true, new: true}
      )
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)})
  },
  // DELETE to remove a user byt its _id
  deleteUserByID(req, res){
    User.findByIdAndDelete(
      {_id: req.params.id},
      {runValidators: true, new: true}
      )
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)})
  },
  // POST to add a new friend to a user's friend list
  async addNewFriend(req, res){
    try {
      const addFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true, runValidators: true },
        );
      if (!addFriend) {
        return res.status(404).json({ message: "ID does not match" });
      }
      res.status(200).json(addFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // DELETE a friend from a user's friend list
  async removeFriend(req, res){
    try {
      const addFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true, runValidators: true },
        );
      if (!addFriend) {
        return res.status(404).json({ message: "ID does not match" });
      }
      res.status(200).json(addFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
}
}