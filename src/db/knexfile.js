export const getConnection = () => {
  const config = {
    production: {
      pool: {
        min: 2,
        max: 20,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false,
      },
      client: process.env.DB_CLIENT,
      version: process.env.DB_VERSION,

      PGSSLMODE: require,
      acquireConnectionTimeout: 60000,
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        port: 5432
      },
    },
  };

  return require('knex')(config.production);
};