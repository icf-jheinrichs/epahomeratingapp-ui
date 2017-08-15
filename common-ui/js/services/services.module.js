import JobChecklistProgressService from './job-checklist-progress.service';
import JobChecklistStateService from './job-checklist-state.service';

let UIServicesModule
    = angular
        .module('epahomeratingapp.services.ui', [])
            .service('JobChecklistProgressService', JobChecklistProgressService)
            .service('JobChecklistStateService', JobChecklistStateService);

export default UIServicesModule;
