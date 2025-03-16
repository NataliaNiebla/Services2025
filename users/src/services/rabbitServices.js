import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const RABBITMQ_EXCHANGE = "user_event";
const RABBITMQ_ROUTING_KEY = "user.created";

export async function userCreatedEvent(user) {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  // Declarar el intercambio (exchange)
  await channel.assertExchange(RABBITMQ_EXCHANGE, "topic", { durable: true });

  // Publicar el evento
  const message = JSON.stringify(user);
  channel.publish(
    RABBITMQ_EXCHANGE,
    RABBITMQ_ROUTING_KEY,
    Buffer.from(message)
  );

  console.log(
    `[x] exchange "${RABBITMQ_EXCHANGE}", routing key "${RABBITMQ_ROUTING_KEY}": ${message}`
  );

  setTimeout(() => {
    connection.close();
  }, 500);
}
