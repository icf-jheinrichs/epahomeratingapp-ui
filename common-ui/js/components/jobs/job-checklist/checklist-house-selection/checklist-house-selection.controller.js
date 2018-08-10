import _find from 'lodash/find';

class checklistHouseSelectionController {
    constructor ($rootScope, $stateParams, $sanitize, $transitions, JobChecklistStateService, ModalService, BASE_IMAGE_URL, UI_ENUMS, jobTitleFilter) {
        'ngInject';

        // capture DI
        this.$rootScope   = $rootScope;
        this.$stateParams = $stateParams;
        this.$sanitize    = $sanitize;
        this.$transitions = $transitions;

        this.DEFAULT_PHOTO               = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.BASE_IMAGE_URL              = BASE_IMAGE_URL;
        this.MESSAGING                   = UI_ENUMS.MESSAGING;
        this.JobChecklistStateService    = JobChecklistStateService;
        this.ModalService                = ModalService;
        this.jobTitleFilter              = jobTitleFilter;
        this.MODAL_PROVIDER_JOB_COMMENTS = UI_ENUMS.MODAL.PROVIDER_JOB_COMMENTS;

        // init View Labels
        this.toggleTextEnum = {
            'more' : 'More',
            'less' : 'Less'
        };
    }

    $onInit () {
        // init view variables
        this.showNavbar         = false;

        this.sampleSize         = this.houses.Secondary.length + 1;

        this.selectedHouse      = this.houses.Primary;
        this.selectedHousePhoto = (this.houses.Primary.Photo.length === 0) ? this.DEFAULT_PHOTO : this.houses.Primary.Photo[0];

        this.toggleText         = this.toggleTextEnum.more;

        // set app bottom pad to accomodate house selector
        this.setAppBottomPad();
        // watch for state change, set current house and hide houseSelection
        this.deregisterOnFinish = this.$transitions.onSuccess(
            {to : (state) => {
                return state.name.indexOf('job-checklist') === 0;
            }},
            () => {
                let houseId = parseInt(this.$stateParams.houseId, 10);

                this.setSelectedHouse(houseId);
                this.hideHouseSelection();

                return houseId;
            }
        );

        this.providerComment = this.JobChecklistStateService.getProviderComment();
    }

    $onDestroy () {
        this.deregisterOnFinish();
        this.$rootScope.$emit(this.MESSAGING.SET_BOTTOM_PAD, 0);
    }

    //TODO: use constant for default photo
    setSelectedHouse (houseId) {
        if (houseId === this.houses.Primary.HouseId) {
            this.selectedHouse = this.houses.Primary;
        } else {
            this.selectedHouse = _find(this.houses.Secondary, {HouseId : houseId});
        }
    }

    onHouseSelectionToggle () {
        this.showNavbar = !this.showNavbar;

        this.setHouseSelectionState();
    }

    hideHouseSelection () {
        this.showNavbar = false;

        this.setHouseSelectionState();
    }

    showHouseSelection () {
        this.showNavbar = false;

        this.setHouseSelectionState();
    }

    showComments () {
        this.ModalService.openModal(this.MODAL_PROVIDER_JOB_COMMENTS);
    }

    getSelectedHousePhoto () {
        return (this.selectedHouse.Photo.length === 0) ? this.DEFAULT_PHOTO : this.BASE_IMAGE_URL + this.selectedHouse.Photo[0];
    }

    setHouseSelectionState () {
        this.toggleText = (this.showNavbar) ? this.toggleTextEnum.less : this.toggleTextEnum.more;

        this.setAppBottomPad();
    }

    setAppBottomPad () {
        let bottomPad = (this.showNavbar) ? 250 : 100;

        this.$rootScope.$emit(this.MESSAGING.SET_BOTTOM_PAD, bottomPad);
    }

    onUpdateHousePhoto (HouseId, photo) {
        this.$rootScope.$emit(this.MESSAGING.UPDATE_HOUSE_PHOTO, {
            HouseId,
            photo
        });
    }

    saveProviderComment () {
        this
            .JobChecklistStateService
            .putProviderComment(JSON.stringify(this.$sanitize(this.providerComment)));
    }

    get selectedHouseTitle () {
        return this.jobTitleFilter(this.selectedHouse.AddressInformation);
    }

    get isProviderRole () {
        return this.$stateParams.role === 'provider';
    }
}

export default checklistHouseSelectionController;
