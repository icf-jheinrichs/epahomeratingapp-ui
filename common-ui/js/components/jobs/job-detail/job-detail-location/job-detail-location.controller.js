import _find from 'lodash/find';

class JobDetailLocationController {
    constructor (UI_ENUMS, $scope) {
        'ngInject';

        this.ratingTypeOptions = UI_ENUMS.RATING_TYPES;
        this.selectHousePlanEnabled = true;
        this.showDetails = 'HousePlanLibrary';

        this.$scope = $scope;
    }

    libraryHousePlanOnSelect () {
        // auto pop builder name
        if (this.location.HousePlan.length === 0) {
            return;
        }

        let self = this;
        let selectedHousePlan = _find(this.housePlans.housePlan, function compare (o) {
            return o._id === self.location.HousePlan[0]._id;
        });

        this.location.Builder = selectedHousePlan.BuilderName;
    }
}

export default JobDetailLocationController;
