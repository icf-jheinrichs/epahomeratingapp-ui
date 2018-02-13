import DOMUtilitiesService from './dom-utilities.service';
import JobChecklistProgressService from './job-checklist-progress.service';
import JobChecklistStateService from './job-checklist-state.service';
import S3Service from './s3.service';

let UIServicesModule
    = angular
        .module('epahomeratingapp.services.ui', [])
        .service('DOMUtilitiesService', DOMUtilitiesService)
        .service('JobChecklistProgressService', JobChecklistProgressService)
        .service('JobChecklistStateService', JobChecklistStateService)
        .service('S3Service', S3Service);

export default UIServicesModule;
