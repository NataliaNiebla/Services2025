import express from 'express'; 
import { getUsers, createUser, updateUser, deleteUsers, login} from '../controllers/userController.js';

const router = express.Router();

router.post ('/', createUser);
router.get('/users', getUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUsers);
router.post ('/login', login);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /api/v1/users/all:
 *  get:
 *    summary: Get all users
 *    tags: [Users]
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/all', getUsers);

export default router;