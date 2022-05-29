require('dotenv').config();

const { Op } = require('sequelize');
const typedefs = require("../typedefs");

/** @type {typedefs.Model} */
const Screenings = require("../models").Screening;

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const getMovieScreenings = async (req, res) => {
	try {
		const { movieID } = req.query;
		let cur_date = new Date();

		const screenings = await Screenings.findAll({
			attributes:	[
				"movieID", "screen", "showtime",  "price",
			],
			where:	{
				movieID,
				showtime: {
					[Op.gte]: cur_date,
				},
			},
			order:	[
				["showtime", "asc"]
			]
		});

		return res.status(200).send(screenings);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
};

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const getScreeningSeats = async (req, res) => {
	try {
		const seats = await Screenings.findOne({
			attributes:	[
				"seats"
			],
			where:	{
				id:	req.query.screeningID,
			},
		});

		if (!seats) {
			return res.status(404)
				.send({ message: "Screening not found." });
		}

		return res.status(200).send(seats);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
};

module.exports = {
	getMovieScreenings,
	getScreeningSeats,
};