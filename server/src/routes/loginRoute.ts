import { Router } from 'express';
import { loginValidation, loginUser } from '../controllers/login';

const loginRoute = Router();

loginRoute.post('/', ...loginValidation, loginUser);

export default loginRoute;
