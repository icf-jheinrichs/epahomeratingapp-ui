import _values from 'lodash/values';

function fileManager ($timeout) {
    return {
        scope    : {
            LocalFiles  : '='
        },
        restrict : 'A',
        link     : (scope, element, attrs, fileManagerCtrl) => {

            // angular doesn't support ngchange for input type file
            // this is a work around for when uploadOnly === 'false'
            element.bind('change', function onChange (event) {
                let parentScope = scope.$parent.$parent;

                $timeout(()=>{
                    parentScope.fileManagerCtrl.files = _values(event.target.files);
                    parentScope.fileManagerCtrl.localSelectedCallback();
                }, 0);
            });

            element.bind('click', function onClick (event) {
                element[0].value = null;
            });
        }
    };
}

export default fileManager;
