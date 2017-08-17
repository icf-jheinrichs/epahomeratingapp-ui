import controller from './file-manager.controller';

function fileManager () {
    return {
        controller,
        scope    : true,
        restrict : 'A',
        link     : (scope, element, attrs, fileManagerCtrl) => {
            element.on('change', function onChange (event) {
                console.log(scope);
                console.log(fileManagerCtrl);
                console.log(element);

                fileManagerCtrl.addLocalFile(element[0].files[0]);
            });

            scope.$on('$destroy', function onDestroy () {
                element.off();
            });
        }
    };
}

export default fileManager;
