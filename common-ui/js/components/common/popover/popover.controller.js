const HIDDEN_CLASS = 'hidden';

class PopoverController {
    constructor ($element, PopoverService) {
        'ngInject';

        this.$element       = $element;

        this.PopoverService      = PopoverService;

        this.overlayElement = angular.element('<div class="overlay drop-down-overlay hidden"></div>');
        $element.append(this.overlayElement);

        this.overlayElement.on('click', () => {
            this.toggle();
        });

        this.overlayElement.on('$destroy', () => {
            this.overlayElement.off('click');
        });
    }

    positionArrow () {
        const toggleCenter = this.toggleFunctions.getToggleCenter();
        this.bodyFunctions.setArrowPosition(toggleCenter);
        // console.dir(pageX);
    }

    open () {
        this.isOpen = true;

        this.bodyElement.removeClass(HIDDEN_CLASS);
        this.overlayElement.removeClass(HIDDEN_CLASS);

        this.positionArrow();

        this.toggleElement.attr('aria-expanded', this.isOpen);
    }

    close () {
        this.isOpen = false;

        this.bodyElement.addClass(HIDDEN_CLASS);
        this.overlayElement.addClass(HIDDEN_CLASS);

        this.toggleElement.attr('aria-expanded', this.isOpen);
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

    registerToggleFunctions (toggleFunctions) {
        this.toggleFunctions = toggleFunctions;
    }

    setBodyElement (element) {
        this.bodyElement = element;
    }

    registerBodyFunctions (bodyFunctions) {
        this.bodyFunctions = bodyFunctions;
    }

    register (id) {
        this
            .PopoverService
            .registerPopover({
                id         : id,
                open       : this.open.bind(this),
                close      : this.close.bind(this)
            });
    }

    deregister (id) {
        this
            .PopoverService
            .deregisterPopover(id);
    }
}

export default PopoverController;
