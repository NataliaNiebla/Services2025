import bodyParser from "body-parser";
import express from "express";
import emailRoutes from "./routes/emailRoute.js";
import { userEvents } from "./services/rabbitServiceEvent.js";
import { clientInfoEvents } from "./services/rabbitServiceEvent.js";
const app = express();

app.use(bodyParser.json());
app.use('/api/email', emailRoutes);


clientInfoEvents().catch(err => {
    console.error('Error iniciando el consumidor de eventos de client info', err);
});


userEvents().catch((err) => {
    console.error('Error iniciando en el consumidor de eventos', err);
});

export default app;