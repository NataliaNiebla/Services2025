import bodyParser from "body-parser";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import swaggerSpec from "./api-docs.js";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
