import { Router } from 'express';
import displayFolders from '../controllers/displayFolders';

const displayFoldersRoute: Router = Router({ mergeParams: true });

displayFoldersRoute.get('/', displayFolders);

export default displayFoldersRoute;
