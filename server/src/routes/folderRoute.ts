import { Router } from 'express';
import createFolder from '../controllers/createFolder';

const folderRoute = Router();

folderRoute.post('/', createFolder);

export default folderRoute;
