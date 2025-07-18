const { Sequelize } = require("sequelize");
const MyConnection = require("../connections/postgres_connection");
const { getRolesQuery } = require("../queries/user_queries");

class RolesService {
    constructor(request, response, next) {
        this._request = request;
        this._response = response;
        this._next = next;
    }
    
    async getRoles() {
        this.postgresConnection = await MyConnection.getInstance();
        const roles = await this.postgresConnection.query(getRolesQuery,
            {
                type: Sequelize.QueryTypes.SELECT
            }
        ).catch(err => {
            console.log("error in getRoles", err);
            throw err;
        });
        return roles;
    }
}

module.exports = RolesService;