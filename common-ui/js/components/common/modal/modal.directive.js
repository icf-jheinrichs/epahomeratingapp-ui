import controller from './modal.controller';

function modal () {
    return {
        controller,
        restrict : 'A',
        link     : (scope, element, attrs, modalCtrl) => {
            if (attrs.id && attrs.id.length > 0) {
                modalCtrl.register(attrs.id);

                scope.$on('$destroy', () => {
                    modalCtrl.deregister(attrs.id);
                });
            }
        }
    };
}

export default modal;
