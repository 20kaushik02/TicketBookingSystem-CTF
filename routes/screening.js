const router = require('express').Router();

const screeningValidator = require('../validators/screening');
const tokenValidator = require('../validators/token');
const validator = require("../validators");

const JWTmiddleware = require("../middleware/tokenAuth");

const screening = require("../controllers/screening");

router.get(
	"/",
	screeningValidator.getMovieScreenings,
	validator.validate,
	screening.getMovieScreenings,
);

router.get(
	"/seats",
	tokenValidator.tokenAuthValidator,
	screeningValidator.getScreeningSeats,
	validator.validate,
	JWTmiddleware.validateJWT,
	screening.getScreeningSeats,
);

module.exports = router;
