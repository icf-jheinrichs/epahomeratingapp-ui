import controller from './document-handler.controller';

function modal () {
    return {
        controller,
        restrict : 'A',
        link     : (scope, element, attrs, documentHandlerCtrl) => {
            element.on('click', ($event) => {
                $event.preventDefault();

                const url = attrs.href;

                if (url) {
                    const urlArray = url.split('/');
                    const fileName = attrs.download || urlArray[urlArray.length - 1];
                    documentHandlerCtrl.downloadFile(url, fileName);
                }
            });
        }
    };
}

export default modal;
