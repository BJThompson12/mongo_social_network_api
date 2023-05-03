const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
  //POST a new Thought and add to User
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const userThought = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );
      if (!userThought) {
        res.status(404).json({ message: 'ID not found' });
        return;
      }
      res.status(200).json(userThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // // GET all Thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // // GET a single Thought by _id
  getThoughtByID(req, res) {
    Thought.findById(req.params.id)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // // PUT to update a thought by its _id
  updateThoughtByID(req, res) {
    Thought.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // // DELETE to remove a thought byt its _id
  deleteThoughtByID(req, res) {
    Thought.findByIdAndDelete(
      { _id: req.params.id },
      { runValidators: true, new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // POST to create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {
    try {
      const createReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!createReaction) {
        return res.status(404).json({ message: 'ID does not match' });
      }
      res.status(200).json(createReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // // DELETE a reaction from a thought by its id
  async removeReaction(req, res) {
    console.log(req.params);
    try {
      const removeReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // must traverse into the object to get to reactionId
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!removeReaction) {
        return res.status(404).json({ message: 'ID does not match' });
      }
      res.status(200).json(removeReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
