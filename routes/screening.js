const router = require('express').Router();

const screeningValidator = require('../validators/screening');
const validator = require("../validators");

const screening = require("../controllers/screening");

router.get(
	"/",
	screeningValidator.getMovieScreenings,
	validator.validate,
	screening.getMovieScreenings,
);

router.get(
	"/screening",
	screeningValidator.getScreening,
	validator.validate,
	screening.getScreeningDetails,
)

router.get(
	"/seats",
	screeningValidator.getScreening,
	validator.validate,
	screening.getScreeningSeats,
);

module.exports = router;
