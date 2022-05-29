const { query } = require("express-validator");

const typedefs = require("../typedefs");

const pos_int_regex = /^[1-9][0-9]*$/

/**
 * @param {typedefs.Req} req 
 * @param {typedefs.Res} res 
 * @param {typedefs.Next} next 
 */
const getMovieScreenings = async (req, res, next) =>	{
	await query("movieID")
		.notEmpty()
		.withMessage("movieID not defined")
		.matches(pos_int_regex)
		.withMessage("movieID should be a positive integer")
		.toInt()
		.run(req);
	
	next();
}

/**
 * @param {typedefs.Req} req 
 * @param {typedefs.Res} res 
 * @param {typedefs.Next} next 
 */
const getScreening = async (req, res, next) =>	{
	await query("screeningID")
		.notEmpty()
		.withMessage("screeningID not defined")
		.matches(pos_int_regex)
		.withMessage("screeningID should be a positive integer")
		.toInt()
		.run(req);
	
	next();
}

module.exports = {
	getMovieScreenings,
	getScreening,
}