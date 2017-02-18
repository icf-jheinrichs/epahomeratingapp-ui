class HousePlanController {
    $onChanges (changes) {
        if (changes.housePlan && !changes.housePlan.isFirstChange()) {
            this.housePlan = changes.housePlan.currentValue;
        }
    }

    get housePlanTitle () {
        let title = '';

        if (this.housePlan && this.housePlan.SubplanName !== undefined) {
            let titleDivider = (this.housePlan.SubplanName.length) ? ' - ' : '';
            title = this.housePlan.Name + titleDivider + this.housePlan.SubplanName;
        }

        return title;
    }
}

export default HousePlanController;
