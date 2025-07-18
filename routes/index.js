const { getRolesQuery } = require("../queries/user_queries");
const RoleRoute = require("./roleRoute");

class IndexRoute {
    constructor(expressApplication) {
      this._app = expressApplication;
    }

    async intializeRoutes() {
        this._app.use("/", new RoleRoute()._route);
    }

}

module.exports = IndexRoute;