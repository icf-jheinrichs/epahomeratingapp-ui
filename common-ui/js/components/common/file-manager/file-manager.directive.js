import _values from 'lodash/values';

const FILE_TYPE_ERROR = {
    type        : 'error',
    text        : 'File type not allowed.',
    dismissable : false
};

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
                    //parentScope.fileManagerCtrl.files = _values(event.target.files);
                    if (this.accept === 'application/pdf') {
                        var ext = this.value.match(/\.(.+)$/)[1];
                        switch (ext) {
                        case 'pdf':
                            break;
                        default:
                            alert('File type error.');
                            this.value = '';
                            parentScope.fileManagerCtrl.handleError({error : {'errorType' : 'errorType', 'errorMessage' : 'errorMessage'}});
                        }
                    }
                    parentScope.fileManagerCtrl.files.push.apply(parentScope.fileManagerCtrl.files, _values(event.target.files));
                    parentScope.fileManagerCtrl.localSelectedCallback();
                }, 0);
            });

            //element.bind('click', function onClick (event) {
            //    element[0].value = null;
            //});
        }
    };
}

export default fileManager;
