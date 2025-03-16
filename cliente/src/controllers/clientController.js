import Client from '../models/clientModel.js';

export const getClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.status(200).json(client);
    } catch (error) {
        console.error('Error al listar clientes', error);
        res.status(500).send({
            message:'Error al obtener los clientes'
        });
    }
};

export const createClient = async (req, res) => {
    const { name, lastname, email, phone, address, birthDate } = req.body;
    if (!name || !lastname || !email || !phone || !address || !birthDate) {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios'
        });
    }
    const newRegex = /^[A-Za-z\s]+$/;
    if (!newRegex.test(name) || !newRegex.test(lastname)) {
        return res.status(400).json({
            message: 'El nombre y apellido no deben contener números'
        });
    }
    const existingClientEmail = await Client.findOne({ where: { email } });
    if (existingClientEmail) {
        return res.status(400).json({
            message: 'El email ya está registrado'
        });
    }
    const existingClientPhone = await Client.findOne({ where: { phone } });
    if (existingClientPhone) {
        return res.status(400).json({
            message: 'El teléfono ya está registrado'
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\s@]+\.[^\a@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: 'El email no es válido'
        });
    }
    if (phone.length !== 10) {
        return res.status(400).json({
            message: 'El teléfono debe tener 10 dígitos'
        });
    }
    if (birthDate.length !== 10) {
        return res.status(400).json({
            message: 'La fecha de nacimiento debe tener el formato dd/mm/aaaa'
        });
    }
    const birthDateObj = new Date(birthDate.split('/').reverse().join('/'));
    const today = new Date();
    const ageDiff = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();

    if (ageDiff < 18 || (ageDiff === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
        return res.status(400).json({
            message: 'El cliente debe ser mayor de edad'
        });
    }
    try {
        const newClient = await Client.create({
            name,
            lastname,
            email,
            phone,
            address,
            birthDate: birthDateObj,
            status: true,
            creationDate: new Date()
        });
        cosole.log (newClient);
        res.status(201).json(newClient);
    } catch (error) {
        console.error('Error al crear cliente', error);
        res.status(500).send({
            message: 'Error al crear el cliente'
        });
    }
};

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const {address, phone} = req.body;

    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }
        if (phone.length !== 10) {
            return res.status(400).json({
                message: 'El teléfono debe tener 10 dígitos'
            });
        }
        const existingPhone = await Client.findOne({ where: { phone } });
        if (existingPhone) {
            return res.status(400).json({
                message: 'El teléfono ya está registrado'
            });
        }
        await client.update({
            phone: phone || client.phone,
            address: address || client.address,
        });

        return res.status(200).json({message: 'Cliente actualizado correctamente', data: client});
    }
    catch (error) {
        console.error('Error al actualizar cliente', error);
        res.status(500).json({
            message: 'Error al actualizar el cliente'
        });
    }
};

export const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }
        await client.update({
            status: false
        });
        return res.status(200).json({message: 'Cliente eliminado correctamente', data: client});
    } 
    catch (error) {
        console.error('Error al eliminar cliente', error);
        res.status(500).json({
            message: 'Error al eliminar el cliente'
        });
    }
};