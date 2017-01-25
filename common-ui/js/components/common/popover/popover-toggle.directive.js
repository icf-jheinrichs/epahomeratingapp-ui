function popoverToggle () {
    return {
        restrict : 'A',
        require  : '?^popover',
        link     : (scope, element, attrs, popoverCtrl) => {
            if (!popoverCtrl) {
                return;
            }

            popoverCtrl.setToggleElement(element);

            function togglePopover (event) {
                event.preventDefault();

                if (!element.hasClass('disabled') && !attrs.disabled) {
                    popoverCtrl.toggle();
                }
            }

            element.on('click', togglePopover);

            scope.$on('$destroy', () => {
                element.off('click', togglePopover);
            });
        }
    };
}

export default popoverToggle;
