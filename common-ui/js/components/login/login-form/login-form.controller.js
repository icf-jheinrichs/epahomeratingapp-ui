const ERROR_INPUT = {
    type        : 'error',
    text        : 'Please enter a valid Username and Password.',
    dismissable : false
};

const ERROR_INPUT_ID = {
    type        : 'error',
    text        : 'Please enter a valid Username.',
    dismissable : false
};

const ERROR_INPUT_PASSWORD = {
    type        : 'error',
    text        : 'Please enter a valid Password (minimum 8 characters).',
    dismissable : false
};

const ERROR_RESET = {
    type        : 'error',
    text        : 'User must reset password.',
    dismissable : false
};

const ERROR_NOT_FOUND = {
    type        : 'error',
    text        : 'User or Password incorrect.',
    dismissable : false
};

const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error. Please try again.',
    dismissable : false
};

class LoginFormController {
    constructor ($scope) {
        'ngInject';

        this.$scope = $scope;
    }

    handleError (err) {
        switch (err.status) {
        case 400:
            this.message = Object.assign({}, ERROR_NOT_FOUND, {text : err.message || ERROR_NOT_FOUND.text});
            break;
        case 401:
            this.message = Object.assign({}, ERROR_RESET);
            break;
        default:
            this.message = Object.assign({}, ERROR_SERVER, {text : err.message || ERROR_SERVER.text});
            break;
        }
    }

    onForgotPassword () {
        this.setAction({
            action : 'forgotPassword'
        });
    }

    onSubmit () {
        this.isBusy.busy = true;

        if (this.$scope.loginForm.userId.$invalid && this.$scope.loginForm.password.$invalid) {
            this.message = Object.assign({}, ERROR_INPUT);
            this.isBusy.busy = false;
        } else if (this.$scope.loginForm.userId.$invalid) {
            this.message = Object.assign({}, ERROR_INPUT_ID);
            this.isBusy.busy = false;
        } else if (this.$scope.loginForm.password.$invalid) {
            this.message = Object.assign({}, ERROR_INPUT_PASSWORD);
            this.isBusy.busy = false;
        } else {
            this
                .login({user : this.user})
                .catch((err) => {
                    this.handleError(err);
                })
                .finally(() => {
                    this.isBusy.busy = false;
                });
        }
    }

    $onChanges (changes) {
        this.message = {};

        if (changes.isBusy) {
            this.isBusy  = angular.copy(this.isBusy);
        }
    }
}

export default LoginFormController;
