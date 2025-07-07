import { Router } from 'express';
import deleteFolder from '../controllers/deleteFolder';
const deleteFolderRoute: Router = Router();

deleteFolderRoute.delete('/', deleteFolder);

export default deleteFolderRoute;
