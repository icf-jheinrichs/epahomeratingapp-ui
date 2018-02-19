import JobChecklistProgressService from './job-checklist-progress.service';
import JobChecklistStateService from './job-checklist-state.service';
import ScrollService from './scroll.service.js';
import S3Service from './s3.service';

let UIServicesModule
    = angular
        .module('epahomeratingapp.services.ui', [])
        .service('JobChecklistProgressService', JobChecklistProgressService)
        .service('JobChecklistStateService', JobChecklistStateService)
        .service('ScrollService', ScrollService)
        .service('S3Service', S3Service);

export default UIServicesModule;
