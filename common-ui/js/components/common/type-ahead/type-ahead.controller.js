const OPEN_CLASS        = 'open';
const MAX_RESULTS_CLASS = 'max-results';

class TypeAheadController {
    constructor ($element, $timeout) {
        'ngInject';

        this.$element = $element;
        this.$timeout = $timeout;
    }

    setOptions (options) {
        this.typeAheadDelay          = options.typeAheadDelay || 125;
        this.typeAheadMinInputLength = options.typeAheadMinInputLength || 3;
        this.typeAheadMaxResults     = options.typeAheadMaxResults || 5;
    }

    setInputElement (element) {
        this.inputElement = element;
    }

    setResultsElement (element) {
        this.resultsElement = element;
    }

    showTypeahead () {
        this.$element.addClass(OPEN_CLASS);
    }

    hideTypeahead () {
        this.$timeout(()=> {
            this.$element.removeClass(OPEN_CLASS);
        }, 175);
    }

    setMaxResultDisplay (resultQuantity) {
        if (resultQuantity > this.typeAheadMaxResults) {
            this.$element.addClass(MAX_RESULTS_CLASS);
        } else {
            this.$element.removeClass(MAX_RESULTS_CLASS);
        }
    }
}

export default TypeAheadController;
