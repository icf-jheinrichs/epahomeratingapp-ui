function dropdownMenu () {
    return {
        restrict : 'A',
        require  : '?^dropdown',
        link     : (scope, element, attrs, dropdownCtrl) => {
            if (!dropdownCtrl) {
                return;
            }

            dropdownCtrl.setMenuElement(element);
        }
    };
}

export default dropdownMenu;
