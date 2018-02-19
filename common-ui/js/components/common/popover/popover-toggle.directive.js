function popoverToggle (DOMUtilitiesService) {
    return {
        restrict : 'A',
        require  : '?^popover',
        link     : (scope, element, attrs, popoverCtrl) => {
            if (!popoverCtrl) {
                return;
            }

            function getToggleCenter () {
                const offsetLeft = DOMUtilitiesService.getOffsetLeftFromPageContainer(element[0]);
                const width      = element[0].offsetWidth;

                return offsetLeft + Math.floor(width / 2);
            }

            popoverCtrl.setToggleElement(element);
            popoverCtrl.registerToggleFunctions({
                getToggleCenter : getToggleCenter.bind(this)
            });

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
