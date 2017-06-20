import _findKey from 'lodash/findKey';

class ChecklistFilterController {
    constructor ($log, UI_ENUMS, $state, $stateParams, $location) {
        'ngInject';

        this.$state       = $state;
        this.$stateParams = $stateParams;
        this.CATEGORIES   = UI_ENUMS.CATEGORIES;

        this.inspectionStageFilters
            = Object.assign(
                {},
                {
                    'Any' : {
                        Name : 'Any',
                        Key  : 'Any'
                    }
                },
                UI_ENUMS.CATEGORY_PROGRESS);


        this.statusFilters = {
            'Any' : {
                Name : 'Any',
                Key  : 'Any'
            },
            'to-do' : {
                Name : 'To-do',
                Key  : 'ToDo'
            },
            'must-correct' : {
                Name : 'Must Correct',
                Key  : 'MustCorrect'
            }
        };
    }

    $onInit () {
        this.inspectionStageFilter = this.getCurrentInspectionStageFilter();
        this.statusFilter          = this.getCurrentStatusFilter();
    }

    getCurrentInspectionStageFilter () {
        if (this.$state.current.name === 'job-checklist.stage') {
            return [this.inspectionStageFilters[this.$stateParams.stageId].Key];
        } else {
            return ['Any'];
        }
    }

    getCurrentStatusFilter () {
        let statusFilter;

        if (this.$stateParams.status) {
            statusFilter = this.statusFilters[this.$stateParams.status].Key;
        } else {
            statusFilter = 'Any';
        }

        return [statusFilter];
    }

    setInspectionStageFilter (response) {
        this.inspectionStageFilter = response;
    }

    setStatusFilter (response) {
        this.statusFilter = response;
    }

    onFilter () {
        const stageId  = _findKey(this.inspectionStageFilters, {Key : this.inspectionStageFilter[0]});
        const statusId = _findKey(this.statusFilters, {Key : this.statusFilter[0]});

        if (this.inspectionStageFilter[0] !== this.inspectionStageFilters['Any'].Key) {
            this.$state.go('job-checklist.stage', {
                houseId    : this.$stateParams.houseId,
                stageId    : stageId,
                status     : statusId
            });
        } else {
            this.$state.go('job-checklist.category', {
                houseId    : this.$stateParams.houseId,
                categoryId : this.$stateParams.categoryId || 'walls',
                status     : statusId
            });
        }
    }
}

export default ChecklistFilterController;
