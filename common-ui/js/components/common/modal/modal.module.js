// common components
import angular from 'angular';

// directives
import modalDirective from './modal.directive';
import ModalService from './modal.service';

let modalModule
    = angular
        .module('epahomeratingapp.common.modal', [])
        .directive('modal', modalDirective)
        .service('ModalService', ModalService);

export default modalModule;
