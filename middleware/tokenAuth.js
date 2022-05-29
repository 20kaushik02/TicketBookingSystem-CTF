require("dotenv").config();

const typedefs = require("../typedefs");

const jwt = require("jsonwebtoken");

const Users = require("../models").User;

/**
 * @param {typedefs.Req} req 
 * @param {typedefs.Res} res
 * @param {typedefs.Next} next 
 */
const validateJWT = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		/** @type {jwt.JwtPayload} */
		let tokenPayload;
		try {
			tokenPayload = jwt.verify(token, process.env.JWTSECRET);
		} catch (error) {
			return res.status(401).send({
				message: error.name + ": " + error.message,
			});
		}
		if (!tokenPayload.id) {
			return res.status(400).send({
				message: "Invalid token.",
			});
		}

		const user = await Users.findOne({
			where: {
				username: tokenPayload.id,
			}
		});

		if (!user) {
			return res.status(403).send({
				message: "User details not found.",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			message: "Server Error. Try again."
		});
	}
}

module.exports = {
	validateJWT,
};