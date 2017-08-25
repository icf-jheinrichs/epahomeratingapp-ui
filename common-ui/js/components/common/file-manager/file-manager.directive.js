
import _values from 'lodash/values';

function fileManager () {
    return {
        scope    : {
            LocalFiles : '='
        },
        restrict : 'A',
        link     : (scope, element, attrs, fileManagerCtrl) => {

            // angular not support ngchange for input type file
            // this is a work around
            // may need to make this better...
            element.bind('change', function onChange (event) {
                let parentScope = scope.$parent.$parent;
                parentScope.$apply(function updateLocalfiles () {
                    parentScope.fileManagerCtrl.files = _values(event.target.files);
                });
            });
        }
    };
}

export default fileManager;
