import bodyParser from "body-parser";
import express from "express";
import clientRoutes from "./routes/clientRoutes.js";
import swaggerSpec from "./api-docs.js";
import swaggerUi from "swagger-ui-express";

//Este archivo dentro de src se encuentra el archivo que nos digerirá nuestro servicio, aquí haremos la mayoría de importaciones en nuestra librerías. En una aplicación backend basada en Node.js, especialmente con Express.js, el archivo app.js dentro de src generalmente tiene el propósito de configurar y centralizar la lógica del servidor. 

const app = express();

app.use(bodyParser.json());

app.use('/api/clients', clientRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;