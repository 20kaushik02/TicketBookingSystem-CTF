require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movie");
const screeningRoutes = require("./routes/screening");
const bookingRoutes = require("./routes/booking");

app.use("/api/auth/", authRoutes);
app.use("/api/movies/", movieRoutes);
app.use("/api/screenings/", screeningRoutes);
app.use("/api/bookings/", bookingRoutes);

app.get("/", (req, res) => {
	return res.status(200).send("Welcome to TBS-CTF 2022-23.");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`App Listening on port ${port}`);
});
