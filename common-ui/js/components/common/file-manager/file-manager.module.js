// common components
import angular from 'angular';

// directives
import fileManagerDirective from './file-manager.directive';

let dialogModule
    = angular
        .module('epahomeratingapp.common.file-manger', [])
            .directive('selectLocalFile', fileManagerDirective);

export default dialogModule;
