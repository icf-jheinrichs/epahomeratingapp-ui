const HIDDEN_CLASS = 'hidden';

class ModalController {
    constructor ($element, ModalService) {
        'ngInject';

        this.$element       = $element;

        this.ModalService = ModalService;

        this.overlayElement = angular.element('<div class="overlay overlay-modal hidden"></div>');
        $element.after(this.overlayElement);

        this.overlayElement.on('click', () => {
            this.close();
        });

        this.overlayElement.on('$destroy', () => {
            this.overlayElement.off('click');
        });

        angular
            .element(this.$element[0].getElementsByClassName('btn-modal-close'))
            .on('click', () => {
                this.close();
            });
    }

    open () {
        this.isOpen = true;

        this.$element.removeClass(HIDDEN_CLASS);
        this.overlayElement.removeClass(HIDDEN_CLASS);
    }

    close () {
        this.isOpen = false;

        this.$element.addClass(HIDDEN_CLASS);
        this.overlayElement.addClass(HIDDEN_CLASS);
    }

    register (id) {
        this
            .ModalService
            .registerModal({
                id         : id,
                open       : this.open.bind(this),
                close      : this.close.bind(this)
            });
    }

    deregister (id) {
        this
            .ModalService
            .deregisterModal(id);
    }
}

export default ModalController;
