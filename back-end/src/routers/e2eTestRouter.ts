import { Router } from "express";
import { deleteAll } from "../controllers/e2econtroller.js";

const e2eTestRouter = Router()

e2eTestRouter.post("/delete-all", deleteAll)

export default e2eTestRouter
