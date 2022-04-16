const Router = require("express").Router;
const {check} = require("express-validator");
const authController = require("./authController");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const router = new Router();

router.post("/login", authController.login);

router.post("/registration", [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password lenght should be in [4;10] interval').isLength({min : 4, max : 10})
], authController.registration);

router.get("/users", roleMiddleware(['ADMIN']), authController.getUsers);

module.exports = router;