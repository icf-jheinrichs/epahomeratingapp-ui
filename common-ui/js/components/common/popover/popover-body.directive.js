function popoverBody (DOMUtilitiesService) {
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

            const arrow = angular.element('<div class="popover-arrow"></div>');

            element.append(arrow);

            function setArrowPosition (toggleCenter) {
                const offsetLeft = DOMUtilitiesService.getOffsetLeftFromPageContainer(element[0]);
                let left         = toggleCenter - offsetLeft - Math.floor(arrow[0].offsetWidth / 2);

                left = Math.max(left, 0);
                left = Math.min(left, element[0].offsetWidth);

                arrow.css({
                    left : `${left}px`
                });
            }

            popoverCtrl.setBodyElement(element);
            popoverCtrl.registerBodyFunctions({
                setArrowPosition : setArrowPosition.bind(this)
            });

            function togglePopover (event) {
                event.preventDefault();

                if (!element.hasClass('disabled') && !attrs.disabled) {
                    popoverCtrl.toggle();
                }
            }

            inlineCloseButtons
                = angular.element(element[0].getElementsByClassName('popover-close'));

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
