import app from "./src/app.js";
import dotenv from "dotenv"; //sirve para leer variables de entorno

dotenv.config();

const port = process.env.PORT_EXPRESS;

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`) // esto es un template string que va a mostrar el puerto en el que se inicio el servidor
});