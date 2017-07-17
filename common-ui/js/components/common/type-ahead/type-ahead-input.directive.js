function typeAheadInput () {
    return {
        restrict : 'A',
        require  : '?^typeAhead',
        link     : (scope, element, attrs, typeAheadCtrl) => {
            if (!typeAheadCtrl) {
                return;
            }

            typeAheadCtrl.setInputElement(element);

            element.on('focus', ()=> {
                typeAheadCtrl.showTypeahead();
            });

            element.on('blur', ()=> {
                typeAheadCtrl.hideTypeahead();
            });
        }
    };
}

export default typeAheadInput;
