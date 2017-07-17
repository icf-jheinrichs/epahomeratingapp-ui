const HIDDEN_CLASS = 'hidden';

function typeAheadResults () {
    return {
        restrict : 'A',
        require  : '?^typeAhead',
        link     : (scope, element, attrs, typeAheadCtrl) => {
            let $element = angular.element(element[0]);

            if (!typeAheadCtrl || attrs.typeAheadResultData === undefined) {
                return;
            }

            scope.$watch(attrs.typeAheadResultData, (newValue, oldValue)=> {
                if (newValue) {
                    let resultsLength = newValue.length;

                    typeAheadCtrl.setMaxResultDisplay(resultsLength);

                    if (resultsLength > 0) {
                        $element.removeClass(HIDDEN_CLASS);
                    } else {
                        $element.addClass(HIDDEN_CLASS);
                    }
                }
            });

            typeAheadCtrl.setResultsElement(element);
        }
    };
}

export default typeAheadResults;
