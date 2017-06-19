class ChecklistFilterController {
    constructor ($log, UI_ENUMS) {
        'ngInject';

        this.inspectionStageFilters
            = Object.assign(
                {},
                {
                    'Any' : {
                        Name : 'Any',
                        Key  : 'any'
                    }
                },
                UI_ENUMS.CATEGORY_PROGRESS);


        this.statusFilters = {
            'Any' : {
                Name : 'Any',
                Key  : 'any'
            },
            'ToDo' : {
                Name : 'To-do',
                Key  : 'ToDo'
            },
            'MustCorrect' : {
                Name : 'Must Correct',
                Key  : 'MustCorrect'
            }
        };

    }
}

export default ChecklistFilterController;
