import _isEmpty from 'lodash/isEmpty';

class jobChecklistChecklistController {
    constructor ($rootScope, $stateParams, FootNotesService, JobChecklistStateService, JobDataHomePerformanceService, ModalService, UI_ENUMS) {
        'ngInject';

        this.$rootScope                    = $rootScope;
        this.$stateParams                  = $stateParams;
        this.JobChecklistStateService      = JobChecklistStateService;
        this.JobDataHomePerformanceService = JobDataHomePerformanceService;
        this.ModalService                  = ModalService;
        this.FootNotesService              = FootNotesService;

        this.MESSAGING           = UI_ENUMS.MESSAGING;
        this.CATEGORIES          = UI_ENUMS.CATEGORIES;
        this.CATEGORY_PROGRESS   = UI_ENUMS.CATEGORY_PROGRESS;

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
                this.jobDisplayList           = jobDisplayList;

                this.preDrywallChecklistItems = this.jobDisplayList[this.categoryKey][this.CATEGORY_PROGRESS['pre-drywall'].Key];
                this.finalChecklistItems      = this.jobDisplayList[this.categoryKey][this.CATEGORY_PROGRESS['final'].Key];

                this.showPredrywallItems      = !_isEmpty(this.preDrywallChecklistItems);
                this.showFinalItems           = !_isEmpty(this.finalChecklistItems);

                if (this.$stateParams.stageId && this.$stateParams.stageId === this.CATEGORY_PROGRESS['pre-drywall'].Key) {
                    this.showFinalItems       = false;
                } else if (this.$stateParams.stageId && this.$stateParams.stageId === this.CATEGORY_PROGRESS['final'].Key) {
                    this.showPredrywallItems  = false;
                }

                this
                    .$rootScope
                    .$emit(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE_TOTALS);
            });
    }

    $onDestroy () {
        // deregister listeners
        this.putMrfDataListener();
        this.showFootnoteListener();
    }

    /**
     * Handler for when this.MESSAGING.UPDATE_MRF_DATA message is broadcast.
     * Calls JobChecklistStateService.updateMrfData and saves mrf data
     * @param  {object} mrfData     object that contains the checklist item id, table key, row index and mrf data
     */
    onPutMrfData (mrfData) {
        this
            .JobChecklistStateService
            .updateMrfData(mrfData);
    }

    /**
     * Handler for when this.MESSAGING.SHOW_FOOTNOTE message is broadcast.
     * @param  {object} footnoteData object that contains the title and text of the footnote to show
     */
    showFootnote (footnoteData) {
        const FOOTNOTE_NOT_FOUND = 'There is no additional information available for this checklist item.';

        let footnote = footnoteData.footnote.length ? footnoteData.footnote : FOOTNOTE_NOT_FOUND;

        this.checklistItemFootnote = {
            title    : footnoteData.title,
            footnote
        };

        this
            .ModalService
            .openModal(this.MODAL_SHOW_FOOTNOTE);
    }
}

export default jobChecklistChecklistController;
