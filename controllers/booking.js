require('dotenv').config();

const typedefs = require("../typedefs");

/** @type {typedefs.Sequelize} */
const sequelize = require("sequelize");

/** @type {typedefs.Sequelize} */
const sequelize_instance = require("../models").sequelize;

/** @type {typedefs.Model} */
const Bookings = require("../models").Booking;

/** @type {typedefs.Model} */
const Screenings = require("../models").Screening;

/** @type {typedefs.Model} */
const Movies = require("../models").Movie;

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
		const { username } = req.user;
		const { screeningID, seat } = req.body;

		const result = await sequelize_instance.transaction(
			{
				isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
			},
			async (t) => {
				const screening = await Screenings.findOne({
					where: {
						id: screeningID,
					},
					transaction: t,
					lock: t.LOCK.UPDATE,
				});

				if (!screening) {
					return res.status(404)
						.send({ message: "Screening not found." });
				}

				if (screening.seats.length < seat) {
					return res.status(400)
						.send({ message: "Seat number out of range." });
				}

				if (screening.seats[seat - 1]) {
					return res.status(409)
						.send({ message: "Seat already booked." });
				}

				screening.seats[seat - 1] = true;

				const updateRes = await Screenings.update({
					seats: screening.seats,
				}, {
					where: {
						id: screeningID,
					},
					transaction: t,
					lock: t.LOCK.UPDATE,
				});

				// first field of update result contains no. of affected rows
				if (updateRes.length > 0 && updateRes[0] === 1) {
					const createRes = await Bookings.create({
						username,
						screeningID,
						seat,
						redeemed: false,
					}, {
						transaction: t,
					},
					);

					return res.status(201)
						.send({
							message: "Booked ticket successfully.",
							booking: createRes.dataValues,
						});
				} else {
					// serializability conflict, rollback
					throw new Error("Update did not occur due to race conditions. Try again.");
				}
			}
		);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
}

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const redeemReferral = async (req, res) => {
	try {
		const { bookingID, referral_code } = req.body;

		const result = await sequelize_instance.transaction(
			{
				isolationLevel: sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
			},
			async (t) => {
				const booking = await Bookings.findOne({
					where: {
						id: bookingID,
					},
					transaction: t,
					lock: t.LOCK.UPDATE,
				});

				if (!booking) {
					return res.status(404)
						.send({ message: "Booking not found." });
				}

				if (booking.redeemed) {
					return res.status(409)
						.send({ message: "Referral already redeemed." });
				}

				const screening = await Screenings.findOne({
					where: {
						id: booking.screeningID,
					},
					transaction: t,
				});

				if (!screening) {
					return res.status(404)
						.send({ message: "Screening not found." });
				}

				const movie = await Movies.findOne({
					where: {
						id: screening.movieID,
					},
					transaction: t,
				});

				if (!movie) {
					return res.status(404)
						.send({ message: "Movie not found." });
				}

				if (referral_code.trim().toUpperCase() === movie.referral.trim().toUpperCase()) {
					const redeemRes = await Bookings.update({
						redeemed: true,
					}, {
						where: {
							id: bookingID
						},
						transaction: t,
						lock: t.LOCK.UPDATE,
					});

					if (redeemRes.length > 0 && redeemRes[0] === 1) {
						return res.status(200)
							.send({ message: "Referral redeemed successfully." });
					} else {
						throw new Error("Update did not occur due to race conditions. Try again.");
					}
				} else {
					return res.status(200)
						.send({ message: "Invalid referral code." });
				}
			}
		);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
}

module.exports = {
	getUserBookings,
	bookTicket,
	redeemReferral,
};