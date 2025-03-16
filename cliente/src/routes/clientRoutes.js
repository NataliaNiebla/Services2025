import express from "express";
import {updateClient, deleteClient, createClient, getClients} from "../controllers/clientController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: The clients managing API
 * /api/clients/new:
 *  post:
 *    summary: Create a new client
 *    tags: [Clients]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The client's name
 *              lastname:
 *                type: string
 *                description: The client's lastname
 *              email:
 *                type: string
 *                description: The client's email
 *              phone:
 *                type: string
 *                description: The client's phone (10 digits)
 *              address:
 *                type: string
 *                description: The client's address
 *              birthDate:
 *                type: string
 *                format: date
 *                description: The client's birth date (YYYY-MM-DD)
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.post('/new', createClient);

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: The clients managing API
 * /api/clients/all:
 *  get:
 *    summary: Get all clients
 *    tags: [Clients]
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get('/all', getClients);

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: The clients managing API
 * /api/clients/update/{id}:
 *  put:
 *    summary: Update a client
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The client's ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              address:
 *                type: string
 *                description: The client's address
 *              phone:
 *                type: string
 *                description: The client's phone (10 digits)
 *    responses:
 *      '200':
 *        description: A successful response
*/

router.put('/update/:id', updateClient);

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: The clients managing API
 * /api/clients/delete/{id}:
 *  put:
 *    summary: Delete a client
 *    tags: [Clients]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The client's ID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *               type: boolean
 *               default: false
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.put('/delete/:id', deleteClient);

export default router;