const config = {
  user: 'sa',
  password: 'SteamUplay2310.',
  server: '192.168.100.53', // Replace 'YourMachineName' with the actual hostname of your SQL Server machine
  database: 'DBCONTACTO', // Replace 'YourDatabaseName' with the name of your database
  options: {
    trustedConnection: false, // Use this for Windows Authentication
    enableArithAbort: true,
    encrypt: true, // Use this for encrypted connection (recommended)
    trustServerCertificate: true
  }
};

module.exports = config;