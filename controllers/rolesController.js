const constants = require("../constants/constants");
const RolesService = require("../services/rolesService");

class RolesController {
    constructor(request, response, next) {
        this._request = request;
        this._response = response;
        this._next = next;
        this._service = new RolesService(
          this._request,
          this._response,
          this._next
        );
      }
    async getRolesHandler() {
        const roles = await this._service.getRoles();
        this._response.status(200).send({
            "status": 200,
            "message": constants.SUCCESS,
            "data": roles
        });
    }
}

module.exports = RolesController;