import transporter from "../config/emailConfig.js";
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (req, res) => {
    const { to, subject, name, message } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            template: "emailTemplate", // Nombre de la plantilla (sin la extensión)
            context: { // Variables para la plantilla
                name,
                message,
            },
        });

        return res.json({ message: "Correo enviado con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
