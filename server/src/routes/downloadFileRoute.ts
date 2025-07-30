import { Router } from 'express';
import downloadFile from '../controllers/downloadFile';

const downloadRouter: Router = Router();

downloadRouter.get('/', downloadFile);

export default downloadRouter;
