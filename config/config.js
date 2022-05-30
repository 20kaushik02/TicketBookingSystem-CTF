require('dotenv').config();
module.exports = {
	"development": {
		"username": process.env.DEV_USERNAME, // local postgres DB username
		"password": process.env.DEV_PASSWORD, // local postgres DB password
		"database": "ctf",
		"host": "127.0.0.1",
		"dialect": "postgres", // DO NOT CHANGE: array data type is used
		"query": {
			"raw": true,
		},
	},
	"test": {
		"username": "root",
		"password": null,
		"database": "database_test",
		"host": "127.0.0.1",
		"dialect": "postgres", // DO NOT CHANGE: array data type is used
		"query": {
			"raw": true,
		},
	},
	"production": {
		"use_env_variable": "DATABASE_URL",
		"dialect": "postgres", // DO NOT CHANGE: array data type is used
		"query": {
			"raw": true,
		},
	}
};