import { Router } from 'express';
import { registerValidation, registerUser } from '../controllers/register';

const registerRoute: Router = Router();

registerRoute.post('/', ...registerValidation, registerUser);

export default registerRoute;
