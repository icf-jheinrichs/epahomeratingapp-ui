import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

class checklistHouseSelectionController {
    constructor (
        $log,
        $rootScope,
        $stateParams,
        $sanitize,
        SanitizeService,
        $transitions,
        $timeout,
        AuthorizationService,
        AssetPathService,
        JobChecklistStateService,
        ModalService,
        UI_ENUMS,
        jobTitleFilter,
        BASE_IMAGE_URL
    ) {
        'ngInject';

        // capture DI
        this.$log         = $log;
        this.$rootScope   = $rootScope;
        this.$stateParams = $stateParams;
        this.$sanitize    = $sanitize;
        this.$transitions = $transitions;
        this.$timeout     = $timeout;

        this.SanitizeService             = SanitizeService;
        this.DEFAULT_PHOTO               = UI_ENUMS.IMAGES.DEFAULT_PHOTO;
        this.MESSAGING                   = UI_ENUMS.MESSAGING;
        this.AssetPathService            = AssetPathService;
        this.AuthorizationService        = AuthorizationService;
        this.JobChecklistStateService    = JobChecklistStateService;
        this.ModalService                = ModalService;
        this.jobTitleFilter              = jobTitleFilter;
        this.MODAL_PROVIDER_JOB_COMMENTS = UI_ENUMS.MODAL.PROVIDER_JOB_COMMENTS;
        this.BASE_IMAGE_URL              = BASE_IMAGE_URL;
        // init View Labels
        this.toggleTextEnum = {
            'more' : 'More',
            'less' : 'Less'
        };
    }

    $onInit () {
        // init view variables
        this.$log.log('[ChecklistHouseSelectionController] initialized');
        this.imageUrl = this.AssetPathService.getBaseURL('IMAGE');
        this.showNavbar         = false;

        this.userAuthorization  = this.AuthorizationService.getUserRole();

        this.sampleSize         = this.houses.Secondary.length + 1;

        this.selectedHouse      = this.houses.Primary;
        this.selectedHousePhoto = (this.houses.Primary.Photo.length === 0) ? this.DEFAULT_PHOTO : this.houses.Primary.Photo[0];
        this.toggleText         = this.toggleTextEnum.more;
        this.elevationPhotos    = [];
        this.elevationPhotosVisible = false;

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
        if (this.selectedHouse.Photo.length === 0) {
            return this.DEFAULT_PHOTO;
        } else {
            this.imageUrl = this.AssetPathService.getBaseURL('IMAGE', this.selectedHouse.Photo[0]);
            return this.imageUrl + this.selectedHouse.Photo[0];
        }
    }

    setHouseSelectionState () {
        this.toggleText = (this.showNavbar) ? this.toggleTextEnum.less : this.toggleTextEnum.more;

        this.setAppBottomPad();
    }

    setAppBottomPad () {
        let bottomPad = (this.showNavbar) ? 250 : 100;

        this.$rootScope.$emit(this.MESSAGING.SET_BOTTOM_PAD, bottomPad);
    }

    onUpdateHousePhoto (HouseId) {
        if (HouseId === this.houses.Primary.HouseId) {
            this.elevationPhotos = this.houses.Primary.Photo;
        } else {
            const selectedHouse = _find(this.houses.Secondary, {HouseId : HouseId});
            this.elevationPhotos = selectedHouse.Photo;
        }

        this.currentElevationPhotos = HouseId;
        this.elevationPhotosVisible = true;
    }

    handlePhotoCapture (photo, key) {
        if (this.currentElevationPhotos === this.houses.Primary.HouseId) {
            this.houses.Primary.Photo[key] = photo;
            this.houses.Primary = angular.copy(this.houses.Primary);
        } else {
            const houseIndex = _findIndex(this.houses.Secondary, {HouseId : this.currentElevationPhotos});
            this.houses.Secondary[houseIndex].Photo[key] = photo;
            this.houses.Secondary[houseIndex] = angular.copy(this.houses.Secondary[houseIndex]);
        }

        this
            .$rootScope
            .$emit(this.MESSAGING.UPDATE_HOUSE_PHOTO, {
                HouseId : this.currentElevationPhotos,
                photo,
                key
            });
    }

    saveProviderComment () {
        if (this.userAuthorization.Provider) {
            this
                .JobChecklistStateService
                .putProviderComment(JSON.stringify(this.SanitizeService.sanitize(this.providerComment)));

            this.ModalService.closeModal(this.MODAL_PROVIDER_JOB_COMMENTS);
        }
    }

    get selectedHouseTitle () {
        return this.jobTitleFilter(this.selectedHouse.AddressInformation);
    }

    get isProviderRole () {
        return this.userAuthorization.Provider && this.$stateParams.role === 'provider';
    }
}

export default checklistHouseSelectionController;
