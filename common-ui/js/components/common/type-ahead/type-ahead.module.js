// directives
import typeAheadDirective from './type-ahead.directive';
import typeAheadInputDirective from './type-ahead-input.directive';
import typeAheadResultsDirective from './type-ahead-results.directive';

let TypeAheadModule
    = angular
        .module('epahomeratingapp.common.typeAhead', [])
        .directive('typeAhead', typeAheadDirective)
        .directive('typeAheadInput', typeAheadInputDirective)
        .directive('typeAheadResults', typeAheadResultsDirective);

export default TypeAheadModule;
