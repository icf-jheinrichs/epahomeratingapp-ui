const HIDDEN_CLASS = 'hidden';

class DialogController {
    constructor ($scope, $element, $log, $q, DialogService) {
        'ngInject';

        let self           = this;

        // this.isOpen = false;
        this.$element      = $element;
        this.$log          = $log;
        this.$q            = $q;
        this.DialogService = DialogService;


        this.overlayElement = angular.element('<div class="hidden overlay overlay-dialog"></div>');
        $element.after(this.overlayElement);

        $scope.dismiss = function dismiss (result) {
            self.close(result);
        };
    }

    register (id) {
        this.id = id;

        this
            .DialogService
            .registerDialog({
                id         : id,
                open       : this.open.bind(this),
                close      : this.close.bind(this)
            });
    }

    deregister (id) {
        this
            .DialogService
            .deregisterDialog(this.id);
    }

    open (promise) {
        this.promise = promise;

        this.$element
            .removeClass(HIDDEN_CLASS);

        this.overlayElement
            .removeClass(HIDDEN_CLASS);
    }

    close (result) {
        this.$element
            .addClass(HIDDEN_CLASS);

        this.overlayElement
            .addClass(HIDDEN_CLASS);

        this.promise.resolve(result);
    }
}

export default DialogController;
