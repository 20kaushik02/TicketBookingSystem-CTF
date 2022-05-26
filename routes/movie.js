const router = require('express').Router();

const movieValidator = require("../validators/movie")
const validator = require("../validators");

const movie = require("../controllers/movie");

router.get(
	"/",
	movie.getAllMovies,
);

router.get(
	"/nowshowing",
	movie.getNowShowing,
);

router.get(
	"/offers",
	movie.getOffersAvailable,
);

router.get(
	"/movie",
	movieValidator.getMovieDetails,
	validator.validate,
	movie.getMovieDetails,
);

module.exports = router;