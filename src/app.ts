import express from 'express';

import cors from "cors";

import { src } from './utils/paths.js';
import path from 'path';

import frontendRoutes from './routes/frontend.routes.js'
import apiRoutes from "./routes/api/api.routes.js"


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(src, 'public')));
app.use("/", frontendRoutes);
app.use("/api", apiRoutes);

export default app;