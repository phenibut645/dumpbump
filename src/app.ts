import express from 'express';

import cors from "cors";

import { src } from './utils/paths.js';
import path from 'path';

import frontendRoutes from './routes/frontend.routes.js'


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(src, 'public')));
app.use("/", frontendRoutes);

export default app;