class JobDisplayListService {
    constructor ($http) {
        'ngInject';

        this.$http = $http;
    }

    get (id) {
        let results
            = this
                .$http
                .get(`/api/job-checklist/${id}`);

        return results;
    }
}

export default JobDisplayListService;
