import scrollAffixDirective from './scroll-affix.directive';
import scrollUpRevealDirective from './scroll-up-reveal.directive';

let ScrollModule
    = angular
        .module('epahomeratingapp.common.scroll', [])
        .directive('scrollAffix', ['ScrollService', scrollAffixDirective])
        .directive('scrollUpReveal', ['ScrollService', scrollUpRevealDirective]);

export default ScrollModule;
