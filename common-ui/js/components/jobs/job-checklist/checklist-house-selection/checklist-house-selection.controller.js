import _ from 'lodash';

class checklistHouseSelectionController {
    constructor ($rootScope, $stateParams, $transitions) {
        'ngInject';

        // capture DI
        this.$rootScope   = $rootScope;
        this.$stateParams = $stateParams;
        this.$transitions = $transitions;

        // init View Labels
        this.toggleTextEnum = {
            'more' : 'More',
            'less' : 'Less'
        };
    }

    $onInit () {
        // init view variables
        this.showNavbar         = true;

        this.sampleSize         = this.houses.Secondary.length + 1;

        this.selectedHouse      = this.houses.Primary;
        this.selectedHouseTitle = this.getSelectedHouseTitle();

        this.toggleText         = this.toggleTextEnum.less;

        // set app bottom pad to accomodate house selector
        this.setAppBottomPad();

        // watch for state change, set current house and hide houseSelection
        this.deregisterOnFinish = this.$transitions.onSuccess(
            {to : 'job-checklist.category'}, () => {
                let houseId = this.$stateParams.houseId;

                this.setSelectedHouse(houseId);
                this.hideHouseSelection();

                return houseId;
            }
        );
    }

    $onDestroy () {
        this.deregisterOnFinish();
    }

    setSelectedHouse (houseId) {
        if (houseId === this.houses.Primary.HouseId) {
            this.selectedHouse = this.houses.Primary;
        } else {
            this.selectedHouse = _.find(this.houses.Secondary, {HouseId : houseId});
        }

        this.selectedHouseTitle = this.getSelectedHouseTitle();
    }

    onHouseSelectionToggle () {
        this.showNavbar = !this.showNavbar;
    }

    hideHouseSelection () {
        this.showNavbar = false;

        this.setHouseSelectionState();
    }

    showHouseSelection () {
        this.showNavbar = false;

        this.setHouseSelectionState();
    }

    //TODO: Move this up into service
    getSelectedHouseTitle () {
        let AddressInformation = this.selectedHouse.AddressInformation;
        let houseTitle         = '';

        if (AddressInformation.Address1) {
            houseTitle = AddressInformation.Address1;
            houseTitle += ` ${AddressInformation.CityMunicipality || ''}`;
            houseTitle += `, ${AddressInformation.StateCode || ''}`;
            houseTitle += ` ${AddressInformation.ZipCode || ''}`;
        } else if (AddressInformation.CommunityName) {
            houseTitle = AddressInformation.CommunityName;
            houseTitle += (AddressInformation.LotNo) ? `, Lot ${AddressInformation.LotNo}` : '';
        } else {
            houseTitle = `Manual ID: ${AddressInformation.ManualId}`;
        }

        return houseTitle;
    }

    setHouseSelectionState () {
        this.toggleText = (this.showNavbar) ? this.toggleTextEnum.less : this.toggleTextEnum.more;

        this.setAppBottomPad();
    }

    setAppBottomPad () {
        let bottomPad = (this.showNavbar) ? 250 : 100;

        this.$rootScope.$emit('setBottomPad', bottomPad);
    }
}

export default checklistHouseSelectionController;
