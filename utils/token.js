require("dotenv").config();

const typedefs = require("../typedefs");

const jwt = require("jsonwebtoken");

/**
 * @returns {jwt.JwtPayload}
 */
const getJWT = (data) => {
	return jwt.sign(
		{ id: data },
		process.env.JWTSECRET,
	);
};

module.exports = {
	getJWT,
};