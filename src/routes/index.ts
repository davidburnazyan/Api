import { Router } from "express";

import authRoute from "./auth";
import crudRoute from "./crud";
import wordRoute from "./word";

class Routing {
    wordRouting: Router;
    authRoute: Router;
    crudRoute: Router;

    constructor() {
        this.authRoute = authRoute
        this.wordRouting = wordRoute
        this.crudRoute = crudRoute
    }
}

export const RoutingService = new Routing()