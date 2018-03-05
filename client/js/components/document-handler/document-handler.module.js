import documentHandlerDirective from './document-handler.directive';

let DocumentHandlerModule
    = angular
        .module('epahomeratingapp.appComponents.documentHandler', [])
        .directive('documentHandler', documentHandlerDirective);

export default DocumentHandlerModule;
