import jobTitleFilter from './job-title/job-title.filter';

let filterModule
    = angular
        .module('epahomeratingapp.filters', [])
            .filter('jobTitle', jobTitleFilter);

export default filterModule;
