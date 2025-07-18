const express = require("express");
const { asyncHandler } = require("../middlewares/errorHandlers");
const RolesController = require("../controllers/rolesController");

class RoleRoute {
    _route = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    async intializeRoutes() {
        this._route.get(
            '/getRoles',
            this.getRoles
        )
    }

    getRoles = asyncHandler(async (req, res, next) => {
        console.log("getRoles");
        const controllerObj = new RolesController(req, res, next);
        await controllerObj.getRolesHandler();
    })
}

module.exports = RoleRoute;