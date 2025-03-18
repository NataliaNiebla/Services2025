import express from "express";
import { getClients, getClientById, createClient, updateClient, deleteClient, sendClientInfo } from "../controllers/clientController.js";

const router = express.Router();

router.get("/getClients/", getClients); // Obtener todos los clientes activos   http://localhost:3001/api/clients/getClients
router.get("/getClientid/:id", getClientById); // Obtener un cliente por ID         
router.post("/sendClientInfo/:id", sendClientInfo); // Nueva ruta para solicitar envío de info por email
router.post("/createClient/", createClient); // Crear un nuevo cliente
router.put("/updateClient/:id", updateClient); // Actualizar un cliente por ID
router.delete("/deleteClient/:id", deleteClient); // Baja lógica de un cliente

export default router;