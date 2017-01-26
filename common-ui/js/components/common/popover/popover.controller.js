const HIDDEN_CLASS = 'hidden';

class PopoverController {
    constructor ($element) {
        'ngInject';

        // this.isOpen = false;
        this.$element = $element;

        this.overlayElement = angular.element('<div class="overlay drop-down-overlay hidden"></div>');
        $element.append(this.overlayElement);

        this.overlayElement.on('click', () => {
            this.toggle();
        });

        this.overlayElement.on('$destroy', () => {
            this.overlayElement.off('click');
        });
    }

    toggle () {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            this.bodyElement.removeClass(HIDDEN_CLASS);
            this.overlayElement.removeClass(HIDDEN_CLASS);
        } else {
            this.bodyElement.addClass(HIDDEN_CLASS);
            this.overlayElement.addClass(HIDDEN_CLASS);
        }

        this.toggleElement.attr('aria-expanded', this.isOpen);
    }

    setToggleElement (element) {
        this.toggleElement = element;
    }

    setBodyElement (element) {
        this.bodyElement = element;
    }
}

export default PopoverController;
