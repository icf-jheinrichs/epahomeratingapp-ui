import scrollAffixDirective from './scroll-affix.directive';
import scrollUpRevealDirective from './scroll-up-reveal.directive';

let ScrollModule
    = angular
        .module('epahomeratingapp.common.scroll', [])
        .directive('scrollAffix', ['ScrollService', '$rootScope', scrollAffixDirective])
        .directive('scrollUpReveal', ['ScrollService', '$rootScope', scrollUpRevealDirective]);

export default ScrollModule;
