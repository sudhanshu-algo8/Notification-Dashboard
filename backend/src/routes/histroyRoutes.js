import express from 'express';
import { getHistory } from '../controllers/notifyController.js';

const historyRouter = express.Router();
historyRouter.get('/', getHistory);


export default historyRouter;
