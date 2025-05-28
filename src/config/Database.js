import 'dotenv/config';

export default { 
    dialect : 'mysql',
    host : process.env.DB_HOST,
    port: process.env.DB_PORT,
    username : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    define : {
        timestamps : true,
        underscored : true,
        underscoredAll : true,
        charset : 'utf8mb4',
        collation : 'utf8mb4_general_ci',
    },
}