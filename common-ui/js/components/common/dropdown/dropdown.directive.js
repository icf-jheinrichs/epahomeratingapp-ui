import controller from './dropdown.controller';


function dropdown () {
    return {
        controller,
        restrict : 'A',
        link     : (scope, element, attrs, dropdownCtrl) => {
            if (attrs.id) {
                dropdownCtrl.register(attrs.id);

                scope.$on('$destroy', () => {
                    dropdownCtrl.deregister(attrs.id);
                });
            }
        }
    };
}

export default dropdown;
