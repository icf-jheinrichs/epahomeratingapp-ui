import _find from 'lodash/find';

class SearchFilterJobTypeController {
    constructor ($stateParams, UI_ENUMS) {
        'ngInject';

        this.$stateParams = $stateParams;

        this.param   = UI_ENUMS.SEARCH_PARAMS.JOB_TYPE;
        this.options = Object.assign({}, UI_ENUMS.ANY, UI_ENUMS.JOB_TYPES);
    }

    $onInit () {
        if (this.$stateParams[this.param]) {
            this.jobType = [this.$stateParams[this.param]];
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
        this.jobType = [this.options.Any.Key];
    }

    setJobType (result) {
        this.jobType = result;
    }

    serialize () {
        let filter;

        if (this.jobType[0] !== this.options.Any.Key) {
            let typeObject;

            typeObject = _find(this.options, (type) => {
                return type.Key === this.jobType[0];
            });

            filter = {
                filterKey  : this.param,
                filterName : typeObject.Name,
                param      : {}
            };

            filter.param[this.param] = this.jobType[0];
        }

        return filter;
    }
}

export default SearchFilterJobTypeController;
