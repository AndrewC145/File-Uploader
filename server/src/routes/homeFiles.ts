import { Router } from 'express';
import displayFile from '../controllers/displayFile';

const homeRouter: Router = Router();

homeRouter.get('/', displayFile.displayHomeFiles);

export default homeRouter;
