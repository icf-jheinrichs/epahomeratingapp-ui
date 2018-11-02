// common components
import angular from 'angular';

// directives
import fileManagerDirective from './file-manager.directive';

let fileManagerModule
    = angular
        .module('epahomeratingapp.common.file-manger', [])
        .directive('selectLocalFile', ['$timeout', fileManagerDirective]);

export default fileManagerModule;
