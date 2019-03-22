import _values from 'lodash/values';

function fileManager ($timeout) {
    return {
        scope    : {
            LocalFiles  : '='
        },
        restrict : 'A',
        link     : (scope, element, attrs, fileManagerCtrl) => {

            // angular not support ngchange for input type file
            // this is a work around
            // may need to make this better...
            element.bind('change', function onChange (event) {
                let parentScope = scope.$parent.$parent;
                $timeout(()=>{

                    if (this.accept === 'application/pdf') {
                        const ext = this.value.match(/\.(.+)$/)[1];
                        switch (ext) {
                        case 'pdf':
                            break;
                        default:
                            parentScope.fileManagerCtrl.handleError({error : 'fileError'});
                            this.value = '';
                        }
                    }
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
