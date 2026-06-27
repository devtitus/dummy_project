import mysql from "mysql2/promise";

let pool;

if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    sslmode: process.env.SSL_MODE,
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

pool = global._mysqlPool;

export default pool;
