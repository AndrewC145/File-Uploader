import { Router } from 'express';
import createFolder from '../controllers/createFolder';

const folderRoute = Router({ mergeParams: true });

folderRoute.post('/', createFolder);

export default folderRoute;
