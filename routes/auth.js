const router = require('express').Router();

const authValidator = require("../validators/auth");
const validator = require("../validators");

const auth = require("../controllers/auth");

router.post(
	"/register",
	authValidator.signUpValidator,
	validator.validate,
	auth.signUp
)

router.post(
	"/login",
	authValidator.signInValidator,
	validator.validate,
	auth.signIn
)

module.exports = router;