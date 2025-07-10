import { Router } from 'express';
import displayFiles from '../controllers/displayFile';

const displayFilesRoute: Router = Router();

displayFilesRoute.post('/', displayFiles);

export default displayFilesRoute;
