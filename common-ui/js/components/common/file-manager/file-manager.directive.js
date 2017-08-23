
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
                    parentScope.LocalFiles = event.target.files;
                    console.log(parentScope.LocalFiles);
                });
            });
        }
    };
}

export default fileManager;
