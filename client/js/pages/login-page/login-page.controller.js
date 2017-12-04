class LoginPageController {
    constructor (AuthenticationService) {
        'ngInject';

        this.AuthenticationService = AuthenticationService;
    }

    $onInit () {
        this.user = this.AuthenticationService.getUser();
    }
}

export default LoginPageController;
