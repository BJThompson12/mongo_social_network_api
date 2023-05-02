const router = require('express').Router();

// require the controller with the methods
const {
  testRoute
} = require('../../controllers/userController')

// /api/user
router.route('/').get(testRoute);

module.exports = router;