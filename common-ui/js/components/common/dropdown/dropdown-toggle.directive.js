function dropdownToggle () {
    return {
        restrict : 'A',
        require  : '?^dropdown',
        link     : (scope, element, attrs, dropdownCtrl) => {
            if (!dropdownCtrl) {
                return;
            }

            element.attr({
                'aria-haspopup' : true,
                'aria-expanded' : false
            });

            dropdownCtrl.setToggleElement(element);

            function toggleDropdown (event) {
                event.preventDefault();

                if (!element.hasClass('disabled') && !attrs.disabled) {
                    dropdownCtrl.toggle();
                }
            }

            element.on('click', toggleDropdown);

            scope.$on('$destroy', () => {
                element.off('click', toggleDropdown);
            });
        }
    };
}

export default dropdownToggle;
