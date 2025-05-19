import { Request, Response, Router } from 'express';
import path from 'path';
import app from "../app.js";
import { src } from '../utils/paths.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(src, 'public/pages/index.html'));
});

export default router;