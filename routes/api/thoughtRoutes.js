const router = require('express').Router();

// require the controller with the methods
const {
  getAllThoughts,
  createThought,
  getThoughtByID,
  updateThoughtByID,
  deleteThoughtByID,
  createReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getAllThoughts).post(createThought);

// /api/thought/:id
router
  .route('/:id')
  .get(getThoughtByID)
  .put(updateThoughtByID)
  .delete(deleteThoughtByID);

// /api/thought/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(removeReaction);

// /api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
module.exports = router;
