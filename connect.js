const sql = require('mysql2');
(async () => {
  try {
    await sql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
    });
    console.log('database connection success...');
  } catch (error) {
    console.log('connection error', error);
  }
})();
