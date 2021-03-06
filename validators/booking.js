const { body, header, param, query } = require("express-validator");

const typedefs = require("../typedefs");

const pos_int_regex = /^[1-9][0-9]*$/

/**
 * @param {typedefs.Req} req 
 * @param {typedefs.Res} res 
 * @param {typedefs.Next} next 
 */
const bookTicketValidator = async (req, res, next) => {
	await body("screeningID")
		.notEmpty()
		.withMessage("screeningID not defined")
		.matches(pos_int_regex)
		.withMessage("screeningID should be a positive integer")
		.toInt()
		.run(req);

	await body("seat")
		.notEmpty()
		.withMessage("seat not defined")
		.matches(pos_int_regex)
		.withMessage("seat should be a positive integer")
		.toInt()
		.run(req);

	next();
}

/**
 * @param {typedefs.Req} req 
 * @param {typedefs.Res} res 
 * @param {typedefs.Next} next 
 */
const redeemReferralValidator = async (req, res, next) => {
	await body('bookingID')
		.notEmpty()
		.withMessage("bookingID not defined")
		.matches(pos_int_regex)
		.withMessage("bookingID should be a positive integer")
		.toInt()
		.run(req);

	await body('referral_code')
		.notEmpty()
		.withMessage('referral_code not defined')
		.run(req);

	next();
}

module.exports = {
	bookTicketValidator,
	redeemReferralValidator,
}