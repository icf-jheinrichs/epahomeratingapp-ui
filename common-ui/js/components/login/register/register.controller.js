const ERROR_NOT_FOUND = {
    type        : 'error',
    text        : 'User with provided Username and Password not found.',
    dismissable : false
};

const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

class RegisterController {
    constructor ($scope) {
        'ngInject';

        this.$scope          = $scope;

        //TODO: Place this in a app constant
        this.passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
    }

    $onInit () {
        this.user = {
            'userId'       : '',
            'firstName'    : '',
            'lastName'     : '',
            'email'        : '',
            'id_token'     : '',
            'access_token' : ''
        };
    }

    handleError (err) {
        switch (err.status) {
        case 403:
            this.message = Object.assign({}, ERROR_NOT_FOUND);
            break;
        default:
            this.message = Object.assign({}, ERROR_SERVER);
            break;
        }
    }

    onSubmit () {
        //TODO: this.
    }

}

export default RegisterController;
