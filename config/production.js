module.exports = {
  database: {
    database: 'prod_db' || process.env.MONGODB_NAME_PROD,
    host: 'prod_host' || process.env.MONGODB_HOST_PROD,
  },
};
