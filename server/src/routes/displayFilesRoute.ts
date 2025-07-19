import { Router } from 'express';
import displayFiles from '../controllers/displayFile';
const displayFilesRoute: Router = Router();

displayFilesRoute.get(
  '/:userId/:folderId/:folderName/displayFiles',
  displayFiles.displayFiles
);

export default displayFilesRoute;
