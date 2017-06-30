import _find from 'lodash/find';
import _filter from 'lodash/filter';

class JobDetailLocationController {
    constructor (UI_ENUMS) {
        'ngInject';

        this.ratingTypeOptions = UI_ENUMS.RATING_TYPES;

        this.housePlanForBuilder = [];
        this.selectHousePlanEnabled = false;
    }

    builderChange (builderId) {
        let builder = _find(this.housePlans.index, function compare (o) {
            return o.builder === builderId;
        });

        let housePlans = builder.housePlan;

        this.housePlanForBuilder = _filter(this.housePlans.housePlan, function filter (o) {
            return housePlans.indexOf(o._id) !== -1;
        });

        this.selectHousePlanEnabled = this.housePlanForBuilder.length !== 0;
    }
}

export default JobDetailLocationController;
