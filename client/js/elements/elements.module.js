import angular from 'angular';
import radialProgressComponenet from './radial-progress/radial-progress.component.js';

let elementsModule
    = angular
        .module('epahomeratingapp.elements', [])
        .component('radialProgress', radialProgressComponenet);

export default elementsModule;
