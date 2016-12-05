class HousePlanController {
    constructor () {
        'ngInject';

    }

    $onInit () {
        //TODO: maybe move this to a service?
        let titleDivider = (this.housePlan.SubplanName.length) ? ' - ' : '';
        this.housePlanTitle = this.housePlan.Name + titleDivider + this.housePlan.SubplanName;
    }
}

export default HousePlanController;
