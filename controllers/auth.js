require('dotenv').config();

const typedefs = require("../typedefs");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const tokenUtils = require("../utils/token");

/** @type {typedefs.Model} */
const Users = require("../models").User;

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const signUp = async (req, res) => {
	try {
		const { username, password, name } = req.body;

		const user = await Users.findOne({
			where:	{
				username,
			},
		});

		if(user)	{
			return res.status(403).
				send({ message: "This username is taken, try another." });
		}

		const salt = await bcrypt.genSalt(saltRounds);
		const pwdHash = await bcrypt.hash(password, salt);

		const new_user = await Users.create({
			username,
			password: pwdHash,
			name
		})

		const jwtToken = tokenUtils.getJWT(new_user.username);

		return res.status(201).
			send({
				message: "Signed up successfully.",
				token: jwtToken,
				username,
				name: new_user.name
			});

	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
}

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const signIn = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await Users.findOne({
			where: {
				username,
			},
		});

		if (!user) {
			return res.status(401).
				send({ message: "User details not found." });
		}

		const validated = await bcrypt.compare(password, user.password);
		if (!validated) {
			return res.status(401).
				send({ message: "Incorrect password, try again." });
		}

		const jwtToken = tokenUtils.getJWT(user.username);

		return res.status(200).
			send({
				message: "Login successful.",
				token: jwtToken,
				username,
				name: user.name
			});

	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
}

module.exports = {
	signUp,
	signIn
};