import DOMUtilitiesService from './dom-utilities.service';
import JobChecklistProgressService from './job-checklist-progress.service';
import JobChecklistStateService from './job-checklist-state.service';
import JobHistoryService from './job-history.service';
import AssetPathService from './asset-path.sevice';
import ScrollService from './scroll.service.js';
import S3Service from './s3.service';

let UIServicesModule = angular
    .module('epahomeratingapp.services.ui', [])
    .service('DOMUtilitiesService', DOMUtilitiesService)
    .service('JobChecklistProgressService', JobChecklistProgressService)
    .service('JobChecklistStateService', JobChecklistStateService)
    .service('JobHistoryService', JobHistoryService)
    .service('AssetPathService', AssetPathService)
    .service('ScrollService', ScrollService)
    .service('S3Service', S3Service);

export default UIServicesModule;
