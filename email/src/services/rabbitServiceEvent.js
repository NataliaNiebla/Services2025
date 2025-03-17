import amqp from 'amqplib';
import dotenv from 'dotenv';
import transporter from '../config/emailConfig.js';

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_HOST;

async function sendEmail(user) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.username,
        subject: 'Bienvenido',
        html: `
            <div style="text-align: center; font-family: Arial, sans-serif; background-color: grey; color: black;">
                <div style="display: flex; justify-content: space-between; padding: 10px;">
                    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tooltyp.com%2F8-beneficios-de-usar-imagenes-en-nuestros-sitios-web%2F&psig=AOvVaw3CXFsM9pPq-YrLMNoJNdBw&ust=1739979568663000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDW4ZPHzYsDFQAAAAAdAAAAABAE" alt="Left Logo" style="height: 50px;">
                    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tooltyp.com%2F8-beneficios-de-usar-imagenes-en-nuestros-sitios-web%2F&psig=AOvVaw3CXFsM9pPq-YrLMNoJNdBw&ust=1739979568663000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDW4ZPHzYsDFQAAAAAdAAAAABAE" alt="Right Logo" style="height: 50px;">
                </div>
                <h1>Bienvenido!</h1>
                <h2>${user.username}</h2>
                <p>Gracias por registrarte en nuestro sistema.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado con éxito');
    } catch (error) {
        console.error('Error enviando el email:', error);
    }
}

export async function userEvents() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        const exchange = 'user_event';
        const queue = 'user_created_queue';
        const routingKey = 'user.created';

        await channel.assertExchange(exchange, "topic", { durable: true });
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, routingKey);

        console.log(`Esperando mensajes en ${queue}`);
        
        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const user = JSON.parse(msg.content.toString());
                console.log("Mensaje recibido:", user);
                await sendEmail(user);
                channel.ack(msg);
            }
        }, { noAck: false });

        connection.on('close', () => {
            console.error('Conexión cerrada, intentando reconectar en 5s...');
            setTimeout(userEvents, 5000);
        });
    } catch (error) {
        console.log('Error al conectar con RabbitMQ:', error.message);
        console.log('Reintentando en 5s...');
        setTimeout(userEvents, 5000);
    }
}