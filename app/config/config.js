// define default config, but allow overrides from ENV vars
let config = {
  APP_DB_HOST: "mongodb://localhost:27017", // replace with your MongoDB Atlas or local connection string
}

Object.keys(config).forEach(key => {
  if (process.env[key] === undefined) {
    console.log(`[NOTICE] Value for key '${key}' not found in ENV, using default value. See app/config/config.js`)
  } else {
    config[key] = process.env[key]
  }
});

module.exports = config;
