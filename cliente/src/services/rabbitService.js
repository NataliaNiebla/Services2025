import amqp from 'amqplib';

export const sendClientInfoEmail = async (to, clientData) => {
    try {
        const RABBITMQ_URL = process.env.RABBITMQ_HOST || 'amqp://localhost';

        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        const exchange = 'client_event';
        const routingKey = 'client.info';

        await channel.assertExchange(exchange, 'topic', { durable: true });

        const message = {
            to,
            client: clientData
        };

        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

        console.log(`Mensaje publicado al exchange ${exchange} con routingKey ${routingKey}:`, message);

        await channel.close();
        await connection.close();

    } catch (error) {
        console.error('Error al publicar el mensaje a RabbitMQ:', error);
        throw error;
    }
};
