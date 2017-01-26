const ERROR_INPUT = {
    type        : 'error',
    text        : 'Please enter a valid User ID and Password.',
    dismissable : false
};

const ERROR_INPUT_ID = {
    type        : 'error',
    text        : 'Please enter a valid User ID.',
    dismissable : false
};

const ERROR_INPUT_PASSWORD = {
    type        : 'error',
    text        : 'Please enter a valid Password (minimum 8 characters).',
    dismissable : false
};

const ERROR_NOT_FOUND = {
    type        : 'error',
    text        : 'User with provided ID and Password not found.',
    dismissable : false
};

const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

class LoginFormController {
    constructor ($scope) {
        'ngInject';

        this.$scope = $scope;
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

    onForgotPassword () {
        this.setAction({
            action : 'forgotPassword'
        });
    }

    onSubmit () {
        this.message = {};

        if (this.$scope.loginForm.userId.$invalid && this.$scope.loginForm.password.$invalid) {
            this.message = Object.assign({}, ERROR_INPUT);
        } else if (this.$scope.loginForm.userId.$invalid) {
            this.message = Object.assign({}, ERROR_INPUT_ID);
        } else if (this.$scope.loginForm.password.$invalid) {
            this.message = Object.assign({}, ERROR_INPUT_PASSWORD);
        } else {
            this
                .login({user : this.user})
                .catch((err) => {
                    this.handleError(err);
                });
        }
    }

}

export default LoginFormController;
