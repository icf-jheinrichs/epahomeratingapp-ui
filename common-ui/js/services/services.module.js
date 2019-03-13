import DOMUtilitiesService from './dom-utilities.service';
import JobChecklistProgressService from './job-checklist-progress.service';
import JobChecklistStateService from './job-checklist-state.service';
import JobHistoryService from './job-history.service';
import ScrollService from './scroll.service.js';
import S3Service from './s3.service';
import SanitizeService from './sanitize.service';

let UIServicesModule = angular
    .module('epahomeratingapp.services.ui', [])
    .service('DOMUtilitiesService', DOMUtilitiesService)
    .service('JobChecklistProgressService', JobChecklistProgressService)
    .service('JobChecklistStateService', JobChecklistStateService)
    .service('JobHistoryService', JobHistoryService)
    .service('ScrollService', ScrollService)
    .service('S3Service', S3Service)
    .service('SanitizeService', SanitizeService);

export default UIServicesModule;
