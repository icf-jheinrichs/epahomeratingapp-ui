// common components
import angular from 'angular';

// directives
import dropdownDirective from './dropdown.directive';
import dropdownToggleDirective from './dropdown-toggle.directive';
import dropdownMenuDirective from './dropdown-menu.directive';

let dropdownModule
    = angular
        .module('epahomeratingapp.common.dropdown', [])
            .directive('dropdown', dropdownDirective)
            .directive('dropdownToggle', dropdownToggleDirective)
            .directive('dropdownMenu', dropdownMenuDirective);

export default dropdownModule;
