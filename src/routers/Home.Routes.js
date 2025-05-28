import { Router } from "express";
import homeController from "../controllers/Home.Controller.js";

const routerHome = new Router()

routerHome.get("/", homeController.index);

export default routerHome;