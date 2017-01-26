function popoverBody () {
    return {
        restrict : 'A',
        require  : '?^popover',
        link     : (scope, element, attrs, popoverCtrl) => {
            let inlineCloseButtons;

            if (!popoverCtrl) {
                return;
            }

            element.attr({
                'aria-hidden' : true
            });

            popoverCtrl.setBodyElement(element);

            function togglePopover (event) {
                event.preventDefault();

                if (!element.hasClass('disabled') && !attrs.disabled) {
                    popoverCtrl.toggle();
                }
            }

            inlineCloseButtons = angular
                .element(element[0].getElementsByClassName('popover-close'));

            inlineCloseButtons
                .on('click', togglePopover);

            scope.$on('$destroy', () => {
                inlineCloseButtons
                    .off('click', togglePopover);
            });
        }
    };
}

export default popoverBody;
