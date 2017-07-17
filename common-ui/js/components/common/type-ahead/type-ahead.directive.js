import controller from './type-ahead.controller';


function typeAhead () {
    return {
        controller,
        restrict : 'A',
        link     : (scope, element, attrs, typeAheadCtrl) => {
            typeAheadCtrl.setOptions({
                typeAheadDelay          : attrs.typeAheadDelay,
                typeAheadMinInputLength : attrs.typeAheadMinInputLength,
                typeAheadMaxResults     : attrs.typeAheadMaxResults
            });
        }
    };
}

export default typeAhead;
