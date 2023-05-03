const router = require('express').Router();

// require the controller with the methods
const {
  getAllUsers, createUser, getUserByID, updateUserByID, deleteUserByID
} = require('../../controllers/userController')

// /api/user
router.route('/').get(getAllUsers).post(createUser);

// api/user/:id
router.route('/:id').get(getUserByID).put(updateUserByID).delete(deleteUserByID)

module.exports = router;