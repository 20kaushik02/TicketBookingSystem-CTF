require('dotenv').config();

const typedefs = require("../typedefs");

const { Op } = require('sequelize');

/** @type {typedefs.Model} */
const Movies = require("../models").Movie;

/** @type {typedefs.Model} */
const Screenings = require("../models").Screening;

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const getAllMovies = async (req, res) => {
	try {
		const all_movies = await Movies.findAll({
			attributes: [
				"id", "details", "referral"
			],
		});

		return res.status(200).send(all_movies);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
}

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const getNowShowing = async (req, res) => {
	try {
		const all_movies = await Movies.findAll({
			attributes: [
				"id", "details", "referral"
			],
		});

		let cur_date = new Date();

		let now_showing = [];

		if (all_movies.length > 0) {
			for (let movie of all_movies) {
				const shows = await Screenings.findAll({
					attributes: [
						"id", "screen", "showtime", "seats"
					],
					where: {
						movieID: movie.id,
						showtime: {
							[Op.gte]: cur_date,
						},
					}
				});

				if (shows.length > 0) {
					movie['screenings'] = shows;
					now_showing.push(movie);
				}
			};
		}

		return res.status(200).send(now_showing);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
}

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const getOffersAvailable = async (req, res) => {
	try {
		const movies_with_offers = await Movies.findAll({
			attributes: [
				"id", "details", "referral"
			],
			where: {
				referral: {
					[Op.ne]: null,
				},
			},
		});

		return res.status(200).send(movies_with_offers);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
}

/**
 * @param {typedefs.Req} req
 * @param {typedefs.Res} res
 */
const getMovieDetails = async (req, res) => {
	try {
		const { movieID } = req.query;

		const movie = await Movies.findOne({
			attributes: [
				"id", "details", "referral"
			],
			where: {
				id: movieID,
			}
		});

		if (!movie) {
			return res.status(404)
				.send({ message: "Movie not found." });
		}
		return res.status(200).send(movie);
	} catch (error) {
		console.error(error);
		return res.status(500).send({ message: "Server Error. Try again." });
	}
}

module.exports = {
	getAllMovies,
	getNowShowing,
	getOffersAvailable,
	getMovieDetails,
}
