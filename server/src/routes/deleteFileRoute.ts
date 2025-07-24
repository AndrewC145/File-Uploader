import { Router } from 'express';
import deleteFileFromStorage from '../controllers/deleteFile';

const deleteFileRoute = Router();

deleteFileRoute.delete('/', deleteFileFromStorage);

export default deleteFileRoute;
