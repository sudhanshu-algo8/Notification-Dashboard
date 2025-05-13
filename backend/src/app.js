import express from "express";

import cors from "cors";

import router from "./routes/notifyRoutes.js";
import routerHistory from "./routes/histroyRoutes.js";


const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/notify", router);
app.use("/api/total", router);
app.use("/api/history", routerHistory);



export default app
