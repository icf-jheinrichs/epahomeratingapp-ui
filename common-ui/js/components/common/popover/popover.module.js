// common components
import angular from 'angular';

// directives
import popoverDirective from './popover.directive';
import popoverToggleDirective from './popover-toggle.directive';
import popoverBodyDirective from './popover-body.directive';

let popoverModule
    = angular
        .module('epahomeratingapp.common.popover', [])
            .directive('popover', popoverDirective)
            .directive('popoverToggle', popoverToggleDirective)
            .directive('popoverBody', popoverBodyDirective);

export default popoverModule;
