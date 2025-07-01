import { Router } from 'express';
import { uploadFile, upload } from '../controllers/createFile';

const uploadRoute = Router();

uploadRoute.post('/', upload.single('fileName'), uploadFile);

export default uploadRoute;
