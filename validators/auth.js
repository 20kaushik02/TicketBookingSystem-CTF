const { body, header, param, query } = require("express-validator");

const typedefs = require("../typedefs");

const text_regex = /^[a-zA-Z0-9_-]{8,50}$/

/**
 * @param {typedefs.Req} req 
 * @param {typedefs.Res} res 
 * @param {typedefs.Next} next 
 */
const signInValidator = async (req, res, next) => {
	await body("username")
		.notEmpty()
		.withMessage("username not defined")
		.matches(text_regex)
		.withMessage("username should have 8-50 characters and contain only alphanumeric, underscore and hyphen characters")
		.run(req);
	
	await body("password")
		.notEmpty()
		.withMessage("password not defined")
		.matches(text_regex)
		.withMessage("password should have 8-50 characters and contain only alphanumeric, underscore and hyphen characters")
		.run(req);

	next();
}

/**
 * @param {typedefs.Req} req 
 * @param {typedefs.Res} res 
 * @param {typedefs.Next} next 
 */
const signUpValidator = async (req, res, next) => {
	await body("username")
		.notEmpty()
		.withMessage("username not defined")
		.matches(text_regex)
		.withMessage("username should have 8-50 characters and contain only alphanumeric, underscore and hyphen characters")
		.run(req);
	
	await body("password")
		.notEmpty()
		.withMessage("password not defined")
		.matches(text_regex)
		.withMessage("password should have 8-50 characters and contain only alphanumeric, underscore and hyphen characters")
		.run(req);
	
	await body("name")
		.notEmpty()
		.withMessage("name not defined")
		.matches(text_regex)
		.withMessage("name should have 8-50 characters and contain only alphanumeric, underscore and hyphen characters")
		.run(req);

	next();
}

module.exports = {
	signInValidator,
	signUpValidator,
}