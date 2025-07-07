import { Router } from 'express';
import logout from '../controllers/logout';
const logoutRoute: Router = Router();

logoutRoute.post('/', logout);

export default logoutRoute;
