import { Router } from 'express';
import displayFolders from '../controllers/displayFolders';

const displayFoldersRoute = Router();

displayFoldersRoute.get('/', displayFolders);

export default displayFoldersRoute;
