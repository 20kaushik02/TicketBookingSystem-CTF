const { header } = require("express-validator");

const typedefs = require("../typedefs");

/**
 * @param {typedefs.Req} req 
 * @param {typedefs.Res} res 
 * @param {typedefs.Next} next 
 */
const tokenAuthValidator = async (req, res, next) => {
	await header("authorization")
		.notEmpty()
		.withMessage("authorization not defined")
		.run(req);

	next();
}

module.exports = {
	tokenAuthValidator,
}