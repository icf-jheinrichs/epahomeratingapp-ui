import controller from './dialog.controller';

function dialog () {
    return {
        controller,
        scope    : true,
        restrict : 'A',
        link     : (scope, element, attrs, dialogCtrl) => {
            if (attrs.id.length > 0) {
                dialogCtrl.register(attrs.id);
            }
        }
    };
}

export default dialog;
