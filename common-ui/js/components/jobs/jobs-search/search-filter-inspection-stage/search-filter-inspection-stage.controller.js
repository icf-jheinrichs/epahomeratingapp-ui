import _find from 'lodash/find';

class SearchFilterInspectionStageController {
    constructor ($stateParams, UI_ENUMS) {
        'ngInject';

        this.$stateParams = $stateParams;

        this.param   = UI_ENUMS.SEARCH_PARAMS.INSPECTION_STAGE;
        this.options = Object.assign({}, UI_ENUMS.ANY, UI_ENUMS.CATEGORY_PROGRESS);
    }

    $onInit () {
        if (this.$stateParams[this.param]) {
            this.inspectionStage = [this.$stateParams[this.param]];
        } else {
            this.reset();
        }

        this.registerFilter({
            filter : {
                reset     : this.reset.bind(this),
                serialize : this.serialize.bind(this)
            }
        });
    }

    reset () {
        this.inspectionStage = [this.options.Any.Key];
    }

    setInspectionStage (result) {
        this.inspectionStage = result;
    }

    serialize () {
        let filter;

        if (this.inspectionStage[0] !== this.options.Any.Key) {
            let stageObject;

            stageObject = _find(this.options, (stage) => {
                return stage.Key === this.inspectionStage[0];
            });

            filter = {
                filterKey  : this.param,
                filterName : stageObject.Name,
                param      : {}
            };

            filter.param[this.param] = this.inspectionStage[0];
        }

        return filter;
    }
}

export default SearchFilterInspectionStageController;
