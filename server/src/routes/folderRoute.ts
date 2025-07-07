import { Router } from 'express';
import createFolder from '../controllers/createFolder';

const folderRoute: Router = Router({ mergeParams: true });

folderRoute.post('/', createFolder);

export default folderRoute;
