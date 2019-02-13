import _values from 'lodash/values';

function fileManager ($timeout) {
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

                $timeout(()=>{
                    console.log(_values(event.target.files));
                    //parentScope.fileManagerCtrl.files = _values(event.target.files);
                    parentScope.fileManagerCtrl.files.push.apply(parentScope.fileManagerCtrl.files, _values(event.target.files));
                    parentScope.fileManagerCtrl.localSelectedCallback();
                    console.log(parentScope.fileManagerCtrl.files);
                }, 0);
            });

            //element.bind('click', function onClick (event) {
            //    element[0].value = null;
            //});
        }
    };
}

export default fileManager;
