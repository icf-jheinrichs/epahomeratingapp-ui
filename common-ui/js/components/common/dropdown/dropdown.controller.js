const HIDDEN_CLASS = 'hidden';

class DropdownController {
    constructor ($element, DropdownService) {
        'ngInject';

        this.$element        = $element;
        this.DropdownService = DropdownService;

        this.overlayElement = angular.element('<div class="overlay drop-down-overlay hidden"></div>');
        $element.append(this.overlayElement);

        this
            .overlayElement
            .on('click', () => {
                this.toggle();
            });

        this
            .overlayElement
            .on('$destroy', () => {
                this.overlayElement.off('click');
            });
    }

    register (id) {
        this.id = id;

        this
            .DropdownService
            .registerDropdown({
                id         : id,
                open       : this.open.bind(this),
                close      : this.close.bind(this)
            });
    }

    deregister (id) {
        this
            .DropdownService
            .deregisterDropdown(this.id);
    }

    open () {
        this.isOpen = true;

        this
            .menuElement
            .removeClass(HIDDEN_CLASS);

        this
            .overlayElement
            .removeClass(HIDDEN_CLASS);

        this
            .toggleElement
            .addClass('active');

        this.toggleElement.attr('aria-expanded', this.isOpen);
    }

    close () {
        this.isOpen = false;

        this
            .menuElement
            .addClass(HIDDEN_CLASS);

        this
            .overlayElement
            .addClass(HIDDEN_CLASS);

        this
            .toggleElement
            .removeClass('active');

        this
            .toggleElement
            .attr('aria-expanded', this.isOpen);
    }

    toggle () {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    setToggleElement (element) {
        this.toggleElement = element;
    }

    setMenuElement (element) {
        this.menuElement = element;
    }
}

export default DropdownController;
