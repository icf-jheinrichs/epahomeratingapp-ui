import _isEmpty from 'lodash/isEmpty';

class jobChecklistChecklistController {
    constructor ($rootScope, $stateParams, JobChecklistStateService, JobDataHomePerformanceService, ModalService, UI_ENUMS) {
        'ngInject';

        this.$rootScope                    = $rootScope;
        this.$stateParams                  = $stateParams;
        this.JobChecklistStateService      = JobChecklistStateService;
        this.JobDataHomePerformanceService = JobDataHomePerformanceService;
        this.JobChecklistStateService      = JobChecklistStateService;
        this.ModalService                  = ModalService;

        this.MESSAGING          = UI_ENUMS.MESSAGING;
        this.CATEGORIES         = UI_ENUMS.CATEGORIES;
        this.CATEGORY_PROGRESS  = UI_ENUMS.CATEGORY_PROGRESS;

        this.MODAL_SHOW_FOOTNOTE = UI_ENUMS.MODAL.SHOW_FOOTNOTE;

        this.putMrfDataListener = this.$rootScope.$on(this.MESSAGING.UPDATE_MRF_DATA, (event, mrfData) => {
            this.onPutMrfData(mrfData);
        });

        this.showFootnoteListener = this.$rootScope.$on(this.MESSAGING.SHOW_FOOTNOTE, (event, footnoteData) => {
            this.showFootnote(footnoteData);
        });
    }

    $onInit () {
        this.categoryKey  = this.CATEGORIES[this.$stateParams.categoryId].Key;
        this.categoryName = this.CATEGORIES[this.$stateParams.categoryId].Name;

        this
            .JobChecklistStateService
            .getJobDisplayList()
            .then(jobDisplayList => {
                this.jobDisplayList = jobDisplayList;

                this.preDrywallChecklistItems = this.jobDisplayList[this.categoryKey][this.CATEGORY_PROGRESS['pre-drywall'].Key];
                this.finalChecklistItems      = this.jobDisplayList[this.categoryKey][this.CATEGORY_PROGRESS['final'].Key];

                this.hasPredrywallItems       = !_isEmpty(this.preDrywallChecklistItems);
                this.hasFinalItems            = !_isEmpty(this.finalChecklistItems);

                this.$rootScope.$emit(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE_TOTALS);
            });
    }

    $onDestroy () {
        // deregister listeners
        this.putMrfDataListener();
        this.showFootnoteListener();
    }


    onPutMrfData (mrfData) {
        this
            .JobChecklistStateService
            .updateMrfData(mrfData);
    }

    showFootnote (footnoteData) {
        const FOOTNOTE_NOT_FOUND = 'There is no additional information available for this checklist item.';

        let footnote = footnoteData.footnote.length ? footnoteData.footnote : FOOTNOTE_NOT_FOUND;

        this.checklistItemFootnote = {
            title    : footnoteData.title,
            footnote
        };

        this.ModalService.openModal(this.MODAL_SHOW_FOOTNOTE);
    }
}

export default jobChecklistChecklistController;
