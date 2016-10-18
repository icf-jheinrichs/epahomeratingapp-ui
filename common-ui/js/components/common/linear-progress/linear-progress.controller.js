class LinearProgressController {
    constructor ($element) {
        'ngInject';

        this.$element = $element;
    }

    $onInit () {
        this.mustCorrectWidth = () => {
            return this.getWidth(this.progress.MustCorrect, this.progress.Total);
        };

        this.verifiedWidth = () => {
            return this.getWidth(this.progress.Verified, this.progress.Total);
        };
    }

    $postLink () {
        if (this.progress.Total === 0) {
            this.$element.addClass('not-applicable');
        }
    }

    getWidth (partial, total) {
        return `${(partial / total) * 100}%`;
    }
}

export default LinearProgressController;
