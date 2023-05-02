const router = require('express').Router();

// require the controller with the methods
const {
  getAllUsers, createUser
} = require('../../controllers/userController')

// /api/user
router.route('/').get(getAllUsers).post(createUser);

module.exports = router;