// common components
import angular from 'angular';
import buttonGroupComponent from './button-group/button-group.component';
import fileManagerComponent from './file-manager/file-manager.component';
import linearProgressComponent from './linear-progress/linear-progress.component';
import listFilterComponent from './list-filter/list-filter.component';
import photoCaptureComponent from './photo-capture/photo-capture.component';
import radialProgressComponent from './radial-progress/radial-progress.component';
import statusMessageComponent from './status-message/status-message.component';
import toggleComponent from './toggle/toggle.component';

// common directives
import DialogModule from './dialog/dialog.module';
import DropdownModule from './dropdown/dropdown.module';
import LightboxModule from './lightbox/lightbox.module';
import PopoverModule from './popover/popover.module';
import TypeAheadModule from './type-ahead/type-ahead.module';
import FileManagerModule from './file-manager/file-manager.module';

let commonModule
    = angular
        .module('epahomeratingapp.common', [
            DropdownModule.name,
            DialogModule.name,
            LightboxModule.name,
            PopoverModule.name,
            TypeAheadModule.name,
            FileManagerModule.name
        ])
            .component('buttonGroup', buttonGroupComponent)
            .component('fileManager', fileManagerComponent)
            .component('linearProgress', linearProgressComponent)
            .component('listFilter', listFilterComponent)
            .component('photoCapture', photoCaptureComponent)
            .component('radialProgress', radialProgressComponent)
            .component('statusMessage', statusMessageComponent)
            .component('toggle', toggleComponent);

export default commonModule;
