require('dotenv').config();

const typedefs = require("../typedefs");

/** @type {typedefs.Sequelize} */
const sequelize = require("sequelize");

/** @type {typedefs.Model} */
const Bookings = require("../models").Booking;

/** @type {typedefs.Model} */
const Screenings = require("../models").Screening;

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const getUserBookings = async (req, res) => {
	try {
		const { username } = req.user;

		const bookings = await Bookings.findAll({
			attributes: [
				"id", "username", "screeningID", "seat", "redeemed",
			],
			where: {
				username,
			},
		});

		return res.status(200).send(bookings);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
}

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const bookTicket = async (req, res) => {
	try {
		// const { username } = req.user;
		// const { screeningID, seat } = req.body;
		// let result = await sequelize.Transaction(async (t) => {
		// 	const updateRes = Screenings.update({
		// 		where:	{
		// 			id: screeningID,
		// 			sequelize.literal()
		// 		}
		// 	},
		// 		{ transaction: t }
		// 	);
		// })

	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
}

module.exports = {
	getUserBookings,
	bookTicket,
};