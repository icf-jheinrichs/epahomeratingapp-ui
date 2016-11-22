class JobDetailLocationController {
    constructor (RATING_TYPES) {
        'ngInject';

        this.ratingTypeOptions = RATING_TYPES;
    }

    $onInit () {
        this.housePlanFileList = [
            {
                FileName : 'house-plan-file.xml',
                Id       : '12344567'
            },
            {
                FileName : 'another-house-plan-file.xml',
                Id       : '23445671'
            },
            {
                FileName : 'final-house-plan-file.xml',
                Id       : '34456712'
            }
        ];
    }

    validateHousePlan () {
        return this.housePlanFileList.length > 0;
    }

    validateRatingType () {
        return this.housePlanFileList.length > 0;
    }
}

export default JobDetailLocationController;
