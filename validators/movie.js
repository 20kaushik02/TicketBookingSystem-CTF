const { body, header, param, query } = require("express-validator");

const typedefs = require("../typedefs");

const pos_int_regex = /^[1-9][0-9]*$/

/**
 * @param {typedefs.Req} req 
 * @param {typedefs.Res} res 
 * @param {typedefs.Next} next 
 */
const getMovieDetails = async (req, res, next) =>	{
	await query("movieID")
		.notEmpty()
		.withMessage("movieID not defined")
		.matches(pos_int_regex)
		.withMessage("movieID should be a positive integer")
		.toInt()
		.run(req);
	
	next();
}

module.exports = {
	getMovieDetails,
}