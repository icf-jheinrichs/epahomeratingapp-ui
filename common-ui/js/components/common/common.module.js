import angular from 'angular';
import buttonGroupComponent from './button-group/button-group.component';
import fileManagerComponent from './file-manager/file-manager.component';
import listFilterComponent from './list-filter/list-filter.component';
import linearProgressComponent from './linear-progress/linear-progress.component';
import radialProgressComponent from './radial-progress/radial-progress.component';
import statusMessageComponent from './status-message/status-message.component';
import toggleComponent from './toggle/toggle.component';

let commonModule
    = angular
        .module('epahomeratingapp.common', [])
        .component('buttonGroup', buttonGroupComponent)
        .component('fileManager', fileManagerComponent)
        .component('linearProgress', linearProgressComponent)
        .component('listFilter', listFilterComponent)
        .component('radialProgress', radialProgressComponent)
        .component('statusMessage', statusMessageComponent)
        .component('toggle', toggleComponent);

export default commonModule;
