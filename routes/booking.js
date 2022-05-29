const router = require('express').Router();

const tokenValidator = require("../validators/token");
const bookingValidator = require("../validators/booking");
const validator = require("../validators");

const JWTmiddleware = require("../middleware/tokenAuth");

const booking = require("../controllers/booking");

router.get(
	"/",
	tokenValidator.tokenAuthValidator,
	validator.validate,
	JWTmiddleware.validateJWT,
	booking.getUserBookings,
);

router.post(
	"/book",
	tokenValidator.tokenAuthValidator,
	bookingValidator.bookTicketValidator,
	validator.validate,
	JWTmiddleware.validateJWT,
	booking.bookTicket,
);

module.exports = router;
