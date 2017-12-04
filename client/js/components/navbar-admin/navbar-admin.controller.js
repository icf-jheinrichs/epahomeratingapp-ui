class NavbarAdminController {
    constructor (AuthorizationService) {
        'ngInject';

        this.AuthorizationService = AuthorizationService;
    }

    $onInit () {
        this.userRole = this.AuthorizationService.getUserRole();

        console.dir(this.userRole);
    }
}

export default NavbarAdminController;
