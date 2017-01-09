const HIDDEN_CLASS = 'hidden';

class DropdownController {
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
            this.menuElement.removeClass(HIDDEN_CLASS);
            this.overlayElement.removeClass(HIDDEN_CLASS);
        } else {
            this.menuElement.addClass(HIDDEN_CLASS);
            this.overlayElement.addClass(HIDDEN_CLASS);
        }

        this.toggleElement.attr('aria-expanded', this.isOpen);
    }

    setToggleElement (element) {
        this.toggleElement = element;
    }

    setMenuElement (element) {
        this.menuElement = element;
    }
}

export default DropdownController;
