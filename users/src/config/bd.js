import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST, //localhost
        port: process.env.DB_PORT, //
        dialect: 'mysql', //
        logging: false,
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión establecida'))
    .catch(err => console.log('No se pudo conectar a la base de datos: ', err));
export default sequelize;
