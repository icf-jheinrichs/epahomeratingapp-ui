function dropdownMenu () {
    return {
        restrict : 'A',
        require  : '?^dropdown',
        link     : (scope, element, attrs, dropdownCtrl) => {
            if (!dropdownCtrl) {
                return;
            }

            dropdownCtrl.setMenuElement(element);

            element
                .find('a')
                .on('click', (event) => {
                    if (angular.element(event.target).hasClass('dropdown-toggle')) {
                        dropdownCtrl.close();
                    }
                });
        }
    };
}

export default dropdownMenu;
