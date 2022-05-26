require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.DEV_USERNAME, //your MySQL username
        "password": process.env.DEV_PASSWORD, //your MySQL password
        "database": "ctf",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "query":    {
            "raw": true,
        },
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "postgres",
        "query":    {
            "raw": true,
        },
    },
    "production": {
        "username": process.env.PROD_USERNAME,
        "password": process.env.PROD_PASSWORD,
        "database": "ctf",
        "host": process.env.PROD_HOST,
        "dialect": "postgres",
        "query":    {
            "raw": true,
        },
    }
};