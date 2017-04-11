// common components
import angular from 'angular';

// directives
import lightboxDirective from './lightbox.directive';

let lightboxModule
    = angular
        .module('epahomeratingapp.common.lightbox', [])
            .directive('lightbox', lightboxDirective);

export default lightboxModule;
