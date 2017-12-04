class HomePageController {
    constructor () {
        'ngInject';
    }

    $onInit () {
        this.jobCounts = {
            'active' : {
                'total' : 10
            },
            'final' : {
                'total' : 10
            },
            'completed' : {
                'total' : 10
            },
            'internalReview' : {
                'total' : 10
            },
            'submittedToProvider' : {
                'total' : 10
            },
            'approved' : {
                'total' : 10
            },
            'registered' : {
                'total' : 10
            },
            'deleted' : {
                'total' : 10
            }
        };
    }
}

export default HomePageController;
