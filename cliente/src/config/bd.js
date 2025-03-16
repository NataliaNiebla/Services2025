import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config(); // esto es para que lea las variables de entorno

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

sequelize.authenticate() // esto es para que se conecte a la base de datos
    .then(() => console.log('Conexión exitosa'))
    .catch((err) => console.error('No se pudo conectar a la base de datos:', err));

export default sequelize;

