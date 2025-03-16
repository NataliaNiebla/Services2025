import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const handlebarOptions = {
    viewEngine: {
        extname: ".hbs", // Extensión de las plantillas
        partialsDir: path.resolve("./views"), // Ruta a las plantillas parciales
        defaultLayout: false,
    },
    viewPath: path.resolve("./views"), // Ruta a las vistas
    extName: ".hbs",
};

transporter.use("compile", hbs(handlebarOptions));

export default transporter;









