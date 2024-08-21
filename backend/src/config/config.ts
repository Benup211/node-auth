require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const configDB = {
  "development": {
    "username": process.env.DB_USERNAME||"postgres",
    "password": process.env.DB_PASSWORD||"",
    "database": process.env.DB_NAME||"",
    "host": process.env.DB_HOST||"",
    "dialect": "postgres",
    "timezone": "+05:45"
  },
  "test": {
    "username": process.env.DB_USERNAME||"postgres",
    "password": process.env.DB_PASSWORD||"",
    "database": process.env.DB_NAME||"",
    "host": process.env.DB_HOST||"",
    "dialect": "postgres",
    "timezone": "+05:45"
  },
  "production": {
    "username": process.env.DB_USERNAME||"postgres",
    "password": process.env.DB_PASSWORD||"",
    "database": process.env.DB_NAME||"",
    "host": process.env.DB_HOST||"",
    "dialect": "postgres",
    "timezone": "+05:45"
  }
};

export default configDB;