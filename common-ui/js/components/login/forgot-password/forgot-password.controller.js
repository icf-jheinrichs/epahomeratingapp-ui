const ERROR_INPUT = {
    type        : 'error',
    text        : 'Please enter a valid User ID',
    dismissable : false
};

const ERROR_NOT_FOUND = {
    type        : 'error',
    text        : 'User ID not found.',
    dismissable : false
};

const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

const SUCCESS = {
    type        : 'success',
    text        : 'An email was sent to the address associated with the provided User ID.',
    dismissable : false
};

class ForgotPasswordController {
    constructor ($scope, $state, UI_ENUMS) {
        'ngInject';

        this.$scope             = $scope;
        this.$state             = $state;
        this.STATE_NAME         = UI_ENUMS.STATE_NAME;
        this.userNamePattern    = /^[A-Za-z\d@._-]{7,}$/;
    }

    handleError (err) {
        switch (err.status) {
        case 404:
            this.message = Object.assign({}, ERROR_NOT_FOUND);
            break;
        case 403:
            this.message = Object.assign({}, ERROR_NOT_FOUND);
            this.message.text = err.message;
            break;
        default:
            this.message = Object.assign({}, ERROR_SERVER);
            break;
        }
    }

    onCancel () {
        this.setAction({
            action : 'login'
        });
    }

    onSubmit () {
        this.message = {};

        if (this.$scope.forgotPassword.$invalid) {
            this.message = Object.assign({}, ERROR_INPUT);
        } else {
            this
                .resetPassword({user : this.user})
                .then((data) => {
                    this.message = Object.assign({}, SUCCESS);
                    return this
                            .$state
                            .go(this.STATE_NAME.USER_RESET_PASSWORD);
                })
                .catch((err) => {
                    this.handleError(err);
                });
        }
    }
}

export default ForgotPasswordController;
