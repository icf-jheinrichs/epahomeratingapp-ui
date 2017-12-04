// common components
import angular from 'angular';

// directives
import dialogDirective from './dialog.directive';
import DialogService from './dialog.service';

let dialogModule
    = angular
        .module('epahomeratingapp.common.dialog', [])
        .directive('dialog', dialogDirective)
        .service('DialogService', DialogService);

export default dialogModule;
