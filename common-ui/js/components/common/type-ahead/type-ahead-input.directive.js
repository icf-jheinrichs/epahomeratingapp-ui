function typeAheadInput () {
    return {
        restrict : 'A',
        require  : ['?^typeAhead', 'ngModel'],
        link     : (scope, element, attrs, [typeAheadCtrl, model]) => {
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
