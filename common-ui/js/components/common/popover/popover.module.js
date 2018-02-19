// common components
import angular from 'angular';

// directives
import popoverDirective from './popover.directive';
import popoverToggleDirective from './popover-toggle.directive';
import popoverBodyDirective from './popover-body.directive';
import PopoverService from './popover.service';

let popoverModule
    = angular
        .module('epahomeratingapp.common.popover', [])
        .directive('popover', popoverDirective)
        .directive('popoverToggle', ['DOMUtilitiesService', popoverToggleDirective])
        .directive('popoverBody', ['DOMUtilitiesService', popoverBodyDirective])
        .service('PopoverService', PopoverService);

export default popoverModule;
