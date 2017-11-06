import _find from 'lodash/find';

class SearchFilterRatingTypeController {
    constructor ($stateParams, UI_ENUMS) {
        'ngInject';

        this.$stateParams = $stateParams;

        this.param   = UI_ENUMS.SEARCH_PARAMS.RATING_TYPE;
        this.options = Object.assign({}, UI_ENUMS.ANY, UI_ENUMS.RATING_TYPES);
    }

    $onInit () {
        if (this.$stateParams[this.param]) {
            this.ratingType = [this.$stateParams[this.param]];
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
        this.ratingType = [this.options.Any.Key];
    }

    setRatingType (result) {
        this.ratingType = result;
    }

    serialize () {
        let filter;

        if (this.ratingType[0] !== this.options.Any.Key) {
            let typeObject;

            typeObject = _find(this.options, (type) => {
                return type.Key === this.ratingType[0];
            });

            filter = {
                filterKey  : this.param,
                filterName : `Rating Type: ${typeObject.Name}`,
                param      : {}
            };

            filter.param[this.param] = this.ratingType[0];
        }

        return filter;
    }
}

export default SearchFilterRatingTypeController;
